"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDocumentation = exports.ENUM_FILTER = exports.ENUM_LIST_FILTER = void 0;
exports.ENUM_LIST_FILTER = '@generate.enum.listFilter';
exports.ENUM_FILTER = '@generate.enum.filter';
const DEFAULT_RETURN = {
    enumListFilter: false,
    enumFilter: false,
};
const parseDocumentation = (documentation) => {
    if (!documentation)
        return DEFAULT_RETURN;
    return {
        ...DEFAULT_RETURN,
        enumListFilter: documentation.includes(exports.ENUM_LIST_FILTER),
        enumFilter: documentation.includes(exports.ENUM_FILTER),
    };
};
exports.parseDocumentation = parseDocumentation;
//# sourceMappingURL=parseDocumentation.js.map