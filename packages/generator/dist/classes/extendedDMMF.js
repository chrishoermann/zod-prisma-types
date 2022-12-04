"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMF = exports.configSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const extendedDMMFDatamodel_1 = require("./extendedDMMFDatamodel");
const extendedDMMFMappings_1 = require("./extendedDMMFMappings");
const extendedDMMFSchema_1 = require("./extendedDMMFSchema");
exports.configSchema = zod_1.default.object({
    useValidatorJs: zod_1.default
        .string()
        .default('false')
        .transform((val) => val === 'true')
        .optional(),
    useDecimalJs: zod_1.default
        .string()
        .default('true')
        .transform((val) => val === 'true')
        .optional(),
    import: zod_1.default
        .string()
        .transform((val) => {
        const valArray = val
            .split(')')
            .map((v) => v.replace(/import\(|.import\(/, ''))
            .filter((v) => v !== '');
        return valArray;
    })
        .optional(),
});
class ExtendedDMMF {
    constructor(dmmf, config) {
        Object.defineProperty(this, "datamodel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mappings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.datamodel = this._getExtendedDatamodel(dmmf);
        this.schema = this._getExtendedSchema(dmmf);
        this.mappings = this._getExtendedMappings(dmmf);
        this.config = this._getExtendedConfig(config);
    }
    _getExtendedDatamodel(dmmf) {
        return new extendedDMMFDatamodel_1.ExtendedDMMFDatamodel(dmmf.datamodel);
    }
    _getExtendedSchema(dmmf) {
        return new extendedDMMFSchema_1.ExtendedDMMFSchema(dmmf.schema, this.datamodel);
    }
    _getExtendedMappings(dmmf) {
        return new extendedDMMFMappings_1.ExtendedDMMFMappings(dmmf.mappings);
    }
    _getExtendedConfig(config) {
        const parsedConfig = exports.configSchema.parse(config);
        return {
            useValidatorJs: Boolean(parsedConfig['useValidatorJs']),
            useDecimalJs: Boolean(parsedConfig['useDecimalJs']),
            import: parsedConfig['import'],
        };
    }
    useValidatorJs() {
        return Boolean(this.config.useValidatorJs);
    }
    useDecimalJs() {
        return Boolean(this.config.useDecimalJs);
    }
    hasCustomImports() {
        return Boolean(this.config.import);
    }
}
exports.ExtendedDMMF = ExtendedDMMF;
//# sourceMappingURL=extendedDMMF.js.map