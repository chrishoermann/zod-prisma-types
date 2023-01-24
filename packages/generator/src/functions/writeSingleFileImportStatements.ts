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
  writeImport(`* as PrismaClient`, `${prismaClientPath}`);

  if (dmmf.schema.hasDecimalTypes) {
    writeImport('{ DecimalJsLike }', `${prismaClientPath}/runtime`);
  }

  if (dmmf.customImports) {
    dmmf.customImports.forEach((statement) => {
      writer.writeLine(statement);
    });
  }
};
