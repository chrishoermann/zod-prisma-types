"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFSchemaField = void 0;
const objectMaps_1 = require("../constants/objectMaps");
const extendedDMMFSchemaArg_1 = require("./extendedDMMFSchemaArg");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFSchemaField extends formattedNames_1.FormattedNames {
    constructor(field, datamodel) {
        super(field.name);
        Object.defineProperty(this, "name", {
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
        Object.defineProperty(this, "outputType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "args", {
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
        Object.defineProperty(this, "documentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prismaAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "argName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "linkedModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = field.name;
        this.isNullable = field.isNullable;
        this.outputType = field.outputType;
        this.args = this._setArgs(field);
        this.deprecation = field.deprecation;
        this.documentation = field.documentation;
        this.prismaAction = this._setMatchedPrismaAction();
        this.modelType = this._setType();
        this.argName = this._setArgName();
        this.linkedModel = this._setLinkedModel(datamodel);
    }
    _setArgs({ args }) {
        return args.map((arg) => {
            return new extendedDMMFSchemaArg_1.ExtendedDMMFSchemaArg(arg);
        });
    }
    _setMatchedPrismaAction() {
        return objectMaps_1.PRISMA_ACTION_ARRAY.find((elem) => this.name.includes(elem));
    }
    _setType() {
        return this.name.replace(this.prismaAction, '');
    }
    _setArgName() {
        const argName = objectMaps_1.PRISMA_ACTION_ARG_MAP[this.prismaAction];
        return `${this.modelType}${argName.formattedNames.pascalCase}Args`;
    }
    _setLinkedModel(datamodel) {
        return datamodel.models.find((model) => typeof this.modelType === 'string'
            ? this.modelType.includes(model.name)
            : false);
    }
}
exports.ExtendedDMMFSchemaField = ExtendedDMMFSchemaField;
//# sourceMappingURL=extendedDMMFSchemaField.js.map