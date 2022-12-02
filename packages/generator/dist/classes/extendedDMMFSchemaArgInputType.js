"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFSchemaArgInputType = void 0;
const objectMaps_1 = require("../constants/objectMaps");
class ExtendedDMMFSchemaArgInputType {
    constructor(arg) {
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
        Object.defineProperty(this, "isNullType", {
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
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getZodScalarType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!this.isStringType())
                    return;
                const zodType = objectMaps_1.PRISMA_TYPE_MAP[this.type];
                if (!zodType)
                    return;
                return zodType;
            }
        });
        Object.defineProperty(this, "getZodNonScalarType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!this.isStringType())
                    return;
                const zodScalarType = objectMaps_1.PRISMA_TYPE_MAP[this.type];
                if (zodScalarType || this.isSpecialType())
                    return;
                return this.type;
            }
        });
        Object.defineProperty(this, "getZodNullType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!this.isStringType())
                    return;
                if (!(this.type === 'Null'))
                    return;
                return 'null';
            }
        });
        Object.defineProperty(this, "isStringType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type = this.type) => {
                return typeof type === 'string';
            }
        });
        Object.defineProperty(this, "isSchemaEnum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type = this.type) => {
                return type.values !== undefined;
            }
        });
        Object.defineProperty(this, "isInputType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type = this.type) => {
                return type.fields !== undefined;
            }
        });
        Object.defineProperty(this, "isSpecialType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return (this.isJsonType ||
                    this.isBytesType ||
                    this.isNullType ||
                    this.isDecimalType);
            }
        });
        this.isJsonType = this._setIsJsonType(arg);
        this.isBytesType = this._setIsBytesType(arg);
        this.isDecimalType = this._setIsDecimalType(arg);
        this.isNullType = this._setIsNullType(arg);
        this.isList = arg.isList;
        this.type = arg.type;
        this.location = arg.location;
        this.namespace = arg.namespace;
    }
    _setIsJsonType(arg) {
        return arg.type === 'Json';
    }
    _setIsBytesType(arg) {
        return arg.type === 'Bytes';
    }
    _setIsDecimalType(arg) {
        return arg.type === 'Decimal';
    }
    _setIsNullType(arg) {
        return arg.type === 'Null';
    }
}
exports.ExtendedDMMFSchemaArgInputType = ExtendedDMMFSchemaArgInputType;
//# sourceMappingURL=extendedDMMFSchemaArgInputType.js.map