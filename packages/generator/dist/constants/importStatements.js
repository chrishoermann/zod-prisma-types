"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENUM_IMPORT_STATEMENT = exports.PRIMSA_IMPORT_STATEMENT = exports.ZOD_IMPORT_STATEMENT = void 0;
const ts_morph_1 = require("ts-morph");
exports.ZOD_IMPORT_STATEMENT = {
    kind: ts_morph_1.StructureKind.ImportDeclaration,
    namedImports: ['z'],
    moduleSpecifier: 'zod',
};
exports.PRIMSA_IMPORT_STATEMENT = {
    kind: ts_morph_1.StructureKind.ImportDeclaration,
    defaultImport: '* as Prisma',
    moduleSpecifier: '@prisma/client',
};
exports.ENUM_IMPORT_STATEMENT = {
    kind: ts_morph_1.StructureKind.ImportDeclaration,
    defaultImport: '* as Enum',
    moduleSpecifier: './enum',
};
//# sourceMappingURL=importStatements.js.map