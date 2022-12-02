"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMMFField = exports.VALIDATOR_MAP = exports.validateRegexInMap = exports.VALIDATOR_TYPE_MAP = void 0;
const regex_1 = require("../constants/regex");
const formattedNames_1 = require("./formattedNames");
exports.VALIDATOR_TYPE_MAP = {
    string: ['String', 'DateTime'],
    number: ['Float', 'Int', 'Decimal'],
    date: ['DateTime'],
};
const validateRegexInMap = (regexMap, { pattern, key }) => {
    const regex = regexMap[key];
    if (!regex) {
        throw new Error(`Could not find regex for validator ${key} in regexMap`);
    }
    const match = pattern.match(regex);
    if (!match) {
        throw new Error(`Could not match validator ${key} with validatorPattern ${pattern}`);
    }
    return match[0];
};
exports.validateRegexInMap = validateRegexInMap;
exports.VALIDATOR_MAP = {
    string: (options) => (0, exports.validateRegexInMap)(regex_1.STRING_VALIDATOR_REGEX_MAP, options),
    number: (options) => (0, exports.validateRegexInMap)(regex_1.NUMBER_VALIDATOR_REGEX_MAP, options),
    date: (options) => (0, exports.validateRegexInMap)(regex_1.DATE_VALIDATOR_REGEX_MAP, options),
};
class DMMFField extends formattedNames_1.FormattedNames {
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
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_validatorRegexMatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_zodValidatorType", {
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
        Object.defineProperty(this, "zodValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "zodCustomErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
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
        this.modelName = modelName;
        this._validatorRegexMatch = this._setValidatorRegexMatch();
        this._zodValidatorType = this._setZodValidatorType();
        this.clearedDocumentation = this._setClearedDocumentation();
        this.zodCustomErrors = this._setZodCustomErrors();
        this.zodValidatorString = this._setZodValidatorString();
    }
    _setValidatorRegexMatch() {
        var _a;
        if (!this.documentation)
            return;
        return (_a = this.documentation.match(regex_1.VALIDATOR_TYPE_REGEX)) !== null && _a !== void 0 ? _a : undefined;
    }
    _setZodValidatorType() {
        var _a, _b;
        const validatorType = (_b = (_a = this._validatorRegexMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['type'];
        if (!validatorType)
            return;
        if (!this._isZodValidatorType(validatorType))
            throw new Error(`Validator '${validatorType}' is not valid for type '${this.type}' @${this.modelName}.${this.name}`);
        return validatorType;
    }
    _setClearedDocumentation() {
        if (!this.documentation)
            return;
        return this.documentation.replace(regex_1.VALIDATOR_TYPE_REGEX, '');
    }
    _isZodValidatorType(validatorType) {
        return exports.VALIDATOR_TYPE_MAP[validatorType].includes(this.type);
    }
    _setZodCustomErrors() {
        var _a, _b;
        return (_b = (_a = this._validatorRegexMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['customErrors'];
    }
    _setZodValidatorString() {
        var _a, _b;
        const pattern = (_b = (_a = this._validatorRegexMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['validatorPattern'];
        if (!pattern)
            return;
        const validatorList = pattern === null || pattern === void 0 ? void 0 : pattern.match(regex_1.SPLIT_VALIDATOR_PATTERN_REGEX);
        if (!validatorList) {
            throw new Error(`no validators found in pattern: ${pattern} in field ${this.modelName}.${this.name}`);
        }
        validatorList.forEach((pattern) => {
            var _a, _b;
            const key = (_b = (_a = pattern.match(regex_1.VALIDATOR_KEY_REGEX)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['validatorKey'];
            if (!key)
                throw new Error(`no validator key found in field: ${this.modelName}.${this.name}`);
            if (!this._zodValidatorType)
                throw new Error(`No validator type set in field: ${this.modelName}.${this.name}`);
            return exports.VALIDATOR_MAP[this._zodValidatorType]({ pattern, key });
        });
        return pattern;
    }
}
exports.DMMFField = DMMFField;
//# sourceMappingURL=DMMFField.js.map