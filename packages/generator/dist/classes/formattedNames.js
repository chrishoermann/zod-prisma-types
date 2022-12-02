"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattedNames = void 0;
const getStringVariants_1 = require("../utils/getStringVariants");
class FormattedNames {
    constructor(string) {
        Object.defineProperty(this, "formattedNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getStringVariants", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: getStringVariants_1.getStringVariants
        });
        this.formattedNames = this.getStringVariants(string);
    }
}
exports.FormattedNames = FormattedNames;
//# sourceMappingURL=formattedNames.js.map