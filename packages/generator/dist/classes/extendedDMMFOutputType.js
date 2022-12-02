"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFOutputType = void 0;
const objectMaps_1 = require("../constants/objectMaps");
const extendedDMMFSchemaField_1 = require("./extendedDMMFSchemaField");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFOutputType extends formattedNames_1.FormattedNames {
    constructor(type, datamodel) {
        super(type.name);
        Object.defineProperty(this, "name", {
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
        this.name = type.name;
        this.fields = this._setFields(type.fields, datamodel);
        this.fieldMap = type.fieldMap;
    }
    _setFields(fields, datamodel) {
        return (fields
            .filter((field) => objectMaps_1.PRISMA_ACTION_ARRAY.find((elem) => field.name.includes(elem)) &&
            !field.name.includes('OrThrow'))
            .map((field) => new extendedDMMFSchemaField_1.ExtendedDMMFSchemaField(field, datamodel)));
    }
}
exports.ExtendedDMMFOutputType = ExtendedDMMFOutputType;
//# sourceMappingURL=extendedDMMFOutputType.js.map