"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFInputObjectType = void 0;
const extendedDMMFSchemaArg_1 = require("./extendedDMMFSchemaArg");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFInputObjectType extends formattedNames_1.FormattedNames {
    constructor(type, model) {
        super(type.name);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "constraints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "meta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fieldMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "matchingModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.matchingModel = model;
        this.name = type.name;
        this.constraints = type.constraints;
        this.meta = type.meta;
        this.fields = this.setFields(type.fields);
        this.fieldMap = type.fieldMap;
    }
    setFields(fields) {
        return fields.map((field) => {
            const isMatch = this.name.match(/CreateInput|CreateMany|UpdateInput|UpdateMany/);
            return new extendedDMMFSchemaArg_1.ExtendedDMMFSchemaArg({
                ...field,
                zodValidatorString: isMatch
                    ? this.getZodValidatorString(field.name)
                    : undefined,
                zodCustomErrors: isMatch
                    ? this.getZodCustomErrorsString(field.name)
                    : undefined,
            });
        });
    }
    getZodValidatorString(fieldName) {
        var _a;
        const field = (_a = this.matchingModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => {
            return field.name === fieldName;
        });
        return field === null || field === void 0 ? void 0 : field.zodValidatorString;
    }
    getZodCustomErrorsString(fieldName) {
        var _a;
        const field = (_a = this.matchingModel) === null || _a === void 0 ? void 0 : _a.fields.find((field) => field.name === fieldName);
        return field === null || field === void 0 ? void 0 : field.zodCustomErrors;
    }
}
exports.ExtendedDMMFInputObjectType = ExtendedDMMFInputObjectType;
//# sourceMappingURL=extendedDMMFInputObjectType.js.map