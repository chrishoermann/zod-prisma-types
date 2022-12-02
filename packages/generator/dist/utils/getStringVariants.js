"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringVariants = void 0;
const lodash_1 = __importDefault(require("lodash"));
function getStringVariants(string) {
    return {
        original: string,
        camelCase: lodash_1.default.camelCase(string),
        pascalCase: lodash_1.default.upperFirst(lodash_1.default.camelCase(string)),
        upperCaseLodash: lodash_1.default.toUpper(lodash_1.default.snakeCase(string)),
        upperCaseSpace: lodash_1.default.upperCase(lodash_1.default.camelCase(string)),
    };
}
exports.getStringVariants = getStringVariants;
//# sourceMappingURL=getStringVariants.js.map