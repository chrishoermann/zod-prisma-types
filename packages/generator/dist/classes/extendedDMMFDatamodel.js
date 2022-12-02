"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFDatamodel = void 0;
const extendedDMMFEnum_1 = require("./extendedDMMFEnum");
const extendedDMMFModel_1 = require("./extendedDMMFModel");
class ExtendedDMMFDatamodel {
    constructor(datamodel) {
        Object.defineProperty(this, "enums", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "models", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "types", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.enums = this._getExtendedEnums(datamodel.enums);
        this.models = this._getExtendedModels(datamodel.models);
        this.types = datamodel.types;
    }
    _getExtendedModels(models) {
        return models.map((model) => new extendedDMMFModel_1.ExtendedDMMFModel(model));
    }
    _getExtendedEnums(enums) {
        return enums.map((elem) => new extendedDMMFEnum_1.ExtendedDMMFEnum(elem));
    }
}
exports.ExtendedDMMFDatamodel = ExtendedDMMFDatamodel;
//# sourceMappingURL=extendedDMMFDatamodel.js.map