"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModel = void 0;
const extendedDMMFField_1 = require("./extendedDMMFField");
const formattedNames_1 = require("./formattedNames");
class ExtendedDMMFModel extends formattedNames_1.FormattedNames {
    constructor(model) {
        super(model.name);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbName", {
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
        Object.defineProperty(this, "uniqueFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "uniqueIndexes", {
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
        Object.defineProperty(this, "primaryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scalarFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relationFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasRelationFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = model.name;
        this.dbName = model.dbName;
        this.fields = this._getExtendedFields(model);
        this.uniqueFields = model.uniqueFields;
        this.uniqueIndexes = model.uniqueIndexes;
        this.documentation = model.documentation;
        this.primaryKey = model.primaryKey;
        this.scalarFields = this._setScalarFields();
        this.relationFields = this._setRelationFields();
        this.enumFields = this._setEnumfields();
        this.hasRelationFields = this._setHasRelationFields();
    }
    _getExtendedFields(model) {
        return model.fields.map((field) => new extendedDMMFField_1.ExtendedDMMFField(field, this.name));
    }
    _setScalarFields() {
        return this.fields.filter((field) => field.kind === 'scalar');
    }
    _setRelationFields() {
        return this.fields.filter((field) => field.kind === 'object');
    }
    _setEnumfields() {
        return this.fields.filter((field) => field.kind === 'enum');
    }
    _setHasRelationFields() {
        return this.relationFields.length > 0;
    }
}
exports.ExtendedDMMFModel = ExtendedDMMFModel;
//# sourceMappingURL=extendedDMMFModel.js.map