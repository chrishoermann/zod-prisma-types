import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileImportStatements: WriteStatements = (
  dmmf,
  { writer, writeImport },
) => {
  const { prismaClientPath } = dmmf.generatorConfig;
  writeImport('{ z }', 'zod');

  // TODO: only import whole namespace if there are json fields - otherwise import type

  if (dmmf.schema.hasJsonTypes) {
    writeImport(`{ Prisma }`, `${prismaClientPath}`);
  } else {
    writeImport(`{ type Prisma }`, `${prismaClientPath}`);
  }

  if (dmmf.customImports) {
    dmmf.customImports.forEach((statement) => {
      writer.writeLine(statement);
    });
  }
};
