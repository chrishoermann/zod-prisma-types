"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFSchema = void 0;
const _1 = require(".");
class ExtendedDMMFSchema {
    constructor(schema, datamodel) {
        Object.defineProperty(this, "rootQueryType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rootMutationType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputObjectTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputObjectTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fieldRefTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasJsonTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasBytesTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasDecimalTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.rootQueryType = schema.rootQueryType;
        this.rootMutationType = schema.rootMutationType;
        this.inputObjectTypes = this._setExtendedInputObjectTypes(schema, datamodel);
        this.outputObjectTypes = this._setExtendedOutputObjectTypes(schema, datamodel);
        this.enumTypes = this._setExtendedEnumTypes(schema);
        this.fieldRefTypes = schema.fieldRefTypes;
        this.hasJsonTypes = this._setHasJsonTypes();
        this.hasBytesTypes = this._setHasBytesTypes();
        this.hasDecimalTypes = this._setHasDecimalTypes();
    }
    _setExtendedInputObjectTypes(schema, datamodel) {
        return {
            ...schema.inputObjectTypes,
            prisma: schema.inputObjectTypes.prisma.map((type) => {
                const matchingDatamodel = datamodel.models.find((model) => {
                    return type.name.match(model.name);
                });
                return new _1.ExtendedDMMFInputType(type, matchingDatamodel);
            }),
        };
    }
    _setExtendedOutputObjectTypes(schema, datamodel) {
        return {
            ...schema.outputObjectTypes,
            prisma: schema.outputObjectTypes.prisma.map((type) => new _1.ExtendedDMMFOutputType(type, datamodel)),
        };
    }
    _setExtendedEnumTypes(schema) {
        return {
            ...schema.enumTypes,
            prisma: schema.enumTypes.prisma.map((type) => new _1.ExtendedDMMFSchemaEnum(type)),
        };
    }
    _setHasJsonTypes() {
        return this.inputObjectTypes.prisma.some((type) => type.isJsonField);
    }
    _setHasBytesTypes() {
        return this.inputObjectTypes.prisma.some((type) => type.isBytesField);
    }
    _setHasDecimalTypes() {
        return this.inputObjectTypes.prisma.some((type) => type.isDecimalField);
    }
}
exports.ExtendedDMMFSchema = ExtendedDMMFSchema;
//# sourceMappingURL=extendedDMMFSchema.js.map