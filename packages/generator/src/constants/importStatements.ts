import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

export const ZOD_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  namedImports: ['z'],
  moduleSpecifier: 'zod',
};

export const TRANSFORM_JSON_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  namedImports: ['transformJsonNull'],
  moduleSpecifier: '../helpers',
};

export const PRIMSA_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  defaultImport: '* as PrismaClient',
  moduleSpecifier: '@prisma/client',
};

export const getPrismaImportStatemnt = (
  prismaClientPath: string,
): ImportDeclarationStructure => ({
  ...PRIMSA_IMPORT_STATEMENT,
  moduleSpecifier: prismaClientPath,
});

export const ENUM_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  defaultImport: '* as Enum',
  moduleSpecifier: './enum',
};

export const DECIMAL_JS_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  namedImports: ['Decimal'],
  moduleSpecifier: 'decimal.js',
};

export const VALIDATOR_JS_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  defaultImport: 'validator',
  moduleSpecifier: 'validator',
};
