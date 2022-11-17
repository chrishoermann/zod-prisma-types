import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

export const ZOD_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  namedImports: ['z'],
  moduleSpecifier: 'zod',
};

export const PRIMSA_IMPORT_STATEMENT: ImportDeclarationStructure = {
  kind: StructureKind.ImportDeclaration,
  defaultImport: '* as Prisma',
  moduleSpecifier: '@prisma/client',
};
