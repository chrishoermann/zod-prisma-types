"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFField = void 0;
const objectMaps_1 = require("../constants/objectMaps");
const regex_1 = require("../constants/regex");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFField extends formattedNames_1.FormattedNames {
    constructor(field, modelName) {
        super(field.name);
        Object.defineProperty(this, "kind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isRequired", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isUnique", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isReadOnly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isGenerated", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasDefaultValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "default", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relationToFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relationOnDelete", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relationName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "documentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isNullable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isJsonType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isBytesType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isDecimalType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "errorLocation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_validatorMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                string: (options) => this._validateRegexInMap(objectMaps_1.STRING_VALIDATOR_REGEX_MAP, options),
                number: (options) => this._validateRegexInMap(objectMaps_1.NUMBER_VALIDATOR_REGEX_MAP, options),
                date: (options) => this._validateRegexInMap(objectMaps_1.DATE_VALIDATOR_REGEX_MAP, options),
                custom: (options) => this._validateRegexInMap(objectMaps_1.CUSTOM_VALIDATOR_REGEX_MAP, options),
                bigint: () => undefined,
            }
        });
        Object.defineProperty(this, "zodCustomErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "zodValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "zodCustomValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clearedDocumentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "zodType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_getZodValidatorData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const matchArrary = this._getValidatorRegexMatch();
                if (!matchArrary)
                    return;
                const type = this._getValidatorType(matchArrary);
                if (!type)
                    return;
                const pattern = this._getValidatorPattern(matchArrary);
                if (!pattern)
                    return {
                        zodCustomErrors: this._getZodCustomErrors(matchArrary),
                    };
                const options = { type, pattern };
                return {
                    zodCustomErrors: this._getZodCustomErrors(matchArrary),
                    zodValidatorString: this._getZodValidatorString(options),
                    zodCustomValidatorString: this._getZodCustomValidatorString(options),
                    clearedDocumentation: this._removeValidatorPatternFromDocs(),
                };
            }
        });
        Object.defineProperty(this, "_getValidatorRegexMatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a;
                if (!this.documentation)
                    return;
                return (_a = this.documentation.match(regex_1.VALIDATOR_TYPE_REGEX)) !== null && _a !== void 0 ? _a : undefined;
            }
        });
        Object.defineProperty(this, "_validateRegexInMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (validationMap, { pattern, key }) => {
                const validate = validationMap[key];
                if (!validate) {
                    throw new Error(`[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`);
                }
                if (typeof validate === 'function') {
                    const validPattern = validate(pattern);
                    if (!validPattern) {
                        throw new Error(`[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`);
                    }
                    return validPattern;
                }
                const match = pattern.match(validate);
                if (!match) {
                    throw new Error(`[@zod generator error]: Could not match validator '${key}' with validatorPattern '${pattern}'. Please check for typos! ${this.errorLocation}`);
                }
                return match[0];
            }
        });
        this.kind = field.kind;
        this.name = field.name;
        this.isRequired = field.isRequired;
        this.isList = field.isList;
        this.isUnique = field.isUnique;
        this.isId = field.isId;
        this.isReadOnly = field.isReadOnly;
        this.type = field.type;
        this.dbNames = field.dbNames;
        this.isGenerated = field.isGenerated;
        this.hasDefaultValue = field.hasDefaultValue;
        this.default = field.default;
        this.relationToFields = field.relationToFields;
        this.relationOnDelete = field.relationOnDelete;
        this.relationName = field.relationName;
        this.documentation = field.documentation;
        this.isJsonType = this._setIsJsonType();
        this.isBytesType = this._setIsBytesType();
        this.isDecimalType = this._setIsDecimalType();
        this.isNullable = this._setIsNullable();
        this.modelName = modelName;
        this.errorLocation = this._setErrorLocation();
        const validatorData = this._getZodValidatorData();
        this.zodCustomErrors = validatorData === null || validatorData === void 0 ? void 0 : validatorData.zodCustomErrors;
        this.zodValidatorString = validatorData === null || validatorData === void 0 ? void 0 : validatorData.zodValidatorString;
        this.zodCustomValidatorString = validatorData === null || validatorData === void 0 ? void 0 : validatorData.zodCustomValidatorString;
        this.clearedDocumentation = validatorData === null || validatorData === void 0 ? void 0 : validatorData.clearedDocumentation;
        this.zodType = this._setZodType();
    }
    _setIsJsonType() {
        return this.type === 'Json';
    }
    _setIsBytesType() {
        return this.type === 'Bytes';
    }
    _setIsDecimalType() {
        return this.type === 'Decimal';
    }
    _setIsNullable() {
        return !this.isRequired;
    }
    _setZodType() {
        if (this.kind === 'scalar')
            return this._getZodTypeFromScalarType();
        return this.type;
    }
    _getZodTypeFromScalarType() {
        return (objectMaps_1.PRISMA_TO_ZOD_TYPE_MAP[this.type] || this.type);
    }
    _setErrorLocation() {
        return `[Error Location]: Model: '${this.modelName}', Field: '${this.name}'.`;
    }
    _getValidatorType(matchArray) {
        var _a;
        const validatorType = (_a = matchArray === null || matchArray === void 0 ? void 0 : matchArray.groups) === null || _a === void 0 ? void 0 : _a['type'];
        if (!(validatorType === null || validatorType === void 0 ? void 0 : validatorType.match(regex_1.VALIDATOR_TYPE_IS_VALID_REGEX)))
            throw new Error(`[@zod generator error]: '${validatorType}' is not a valid validator type. ${this.errorLocation}`);
        const isValidTypeForPrisma = objectMaps_1.PRISMA_TO_VALIDATOR_TYPE_MAP[validatorType].includes(this.type);
        if (!isValidTypeForPrisma)
            throw new Error(`[@zod generator error]: Validator '${validatorType}' is not valid for type '${this.type}'. ${this.errorLocation}`);
        return validatorType;
    }
    _getValidatorPattern(matchArray) {
        var _a;
        if (!matchArray)
            return;
        return (_a = matchArray === null || matchArray === void 0 ? void 0 : matchArray.groups) === null || _a === void 0 ? void 0 : _a['validatorPattern'];
    }
    _getZodCustomErrors(matchArray) {
        var _a, _b;
        const customErrors = (_a = matchArray === null || matchArray === void 0 ? void 0 : matchArray.groups) === null || _a === void 0 ? void 0 : _a['customErrors'];
        if (!customErrors)
            return;
        const customErrorsString = customErrors.match(regex_1.VALIDATOR_CUSTOM_ERROR_REGEX);
        const validErrorMessages = (_b = customErrorsString === null || customErrorsString === void 0 ? void 0 : customErrorsString.groups) === null || _b === void 0 ? void 0 : _b['object'].match(regex_1.VALIDATOR_CUSTOM_ERROR_KEYS_REGEX);
        if (!validErrorMessages)
            return;
        return `{ ${validErrorMessages.join(', ')} }`;
    }
    _getZodCustomValidatorString({ type, pattern }) {
        if (type !== 'custom' || !pattern)
            return;
        const key = this._getValidatorKeyFromPattern(pattern);
        if (key !== 'use')
            throw new Error(`[@zod generator error]: Please use the '.use()' key on '@zod.custom.use(...yourCode)'. ${this.errorLocation}`);
        return this._validatorMap[type]({ pattern, key });
    }
    _getZodValidatorString({ type, pattern }) {
        if (type === 'custom')
            return;
        const splitPattern = pattern.split(/(?=\.[\w])/);
        splitPattern.forEach((pattern) => {
            const key = this._getValidatorKeyFromPattern(pattern);
            const isValid = this._validatorMap[type]({ pattern, key });
            if (!isValid)
                throw new Error(`[@zod generator error]: Validator '${key}' is not valid for type '${this.type}'. ${this.errorLocation}`);
        });
        return pattern;
    }
    _getValidatorKeyFromPattern(pattern) {
        var _a, _b;
        const key = (_b = (_a = pattern.match(regex_1.VALIDATOR_KEY_REGEX)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['validatorKey'];
        if (!key)
            throw new Error(`[@zod generator error]: no matching validator key found in '${pattern}'. ${this.errorLocation}`);
        return key;
    }
    _removeValidatorPatternFromDocs() {
        if (!this.documentation)
            return;
        return (this.documentation.replace(regex_1.VALIDATOR_TYPE_REGEX, '').trim() || undefined);
    }
}
exports.ExtendedDMMFField = ExtendedDMMFField;
//# sourceMappingURL=extendedDMMFField.js.map