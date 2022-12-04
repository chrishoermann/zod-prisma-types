"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFSchemaArg = void 0;
const _1 = require(".");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFSchemaArg extends formattedNames_1.FormattedNames {
    constructor(arg, linkedField) {
        super(arg.name);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "comment", {
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
        Object.defineProperty(this, "isRequired", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "deprecation", {
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
        Object.defineProperty(this, "zodCustomValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasSingleType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasMultipleTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isOptional", {
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
        Object.defineProperty(this, "linkedField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_setInputTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (inputTypes) => {
                const nonNullTypes = inputTypes.filter((type) => type.type !== 'Null');
                if (this.name === 'by') {
                    return nonNullTypes
                        .filter((inputType) => inputType.isList === true)
                        .map((inputType) => {
                        return new _1.ExtendedDMMFSchemaArgInputType(inputType);
                    });
                }
                return nonNullTypes.map((inputType) => {
                    return new _1.ExtendedDMMFSchemaArgInputType(inputType);
                });
            }
        });
        this.name = arg.name;
        this.comment = arg.comment;
        this.isNullable = arg.isNullable;
        this.isRequired = arg.isRequired;
        this.inputTypes = this._setInputTypes(arg.inputTypes);
        this.deprecation = arg.deprecation;
        this.zodValidatorString = arg.zodValidatorString;
        this.zodCustomErrors = arg.zodCustomErrors;
        this.zodCustomValidatorString = arg.zodCustomValidatorString;
        this.hasSingleType = this._setHasSingleType();
        this.hasMultipleTypes = this._setHasMultipleTypes();
        this.isOptional = this._setIsOptional();
        this.isJsonType = this._setIsJsonType();
        this.isBytesType = this._setIsBytesType();
        this.isDecimalType = this._setIsDecimalType();
        this.linkedField = linkedField;
    }
    _setHasSingleType() {
        return this.inputTypes.length === 1;
    }
    _setHasMultipleTypes() {
        return this.inputTypes.length > 1;
    }
    _setIsOptional() {
        return !this.isRequired;
    }
    _setIsJsonType() {
        return this.inputTypes.some((inputType) => inputType.isJsonType);
    }
    _setIsBytesType() {
        return this.inputTypes.some((inputType) => inputType.isBytesType);
    }
    _setIsDecimalType() {
        return this.inputTypes.some((inputType) => inputType.isDecimalType);
    }
}
exports.ExtendedDMMFSchemaArg = ExtendedDMMFSchemaArg;
//# sourceMappingURL=extendedDMMFSchemaArg.js.map