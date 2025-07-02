import { writeImportStatementOptions } from '../classes';
import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileImportStatements: WriteStatements = (
  dmmf,
  { writeImports },
) => {
  const { prismaClientPath, decimalJSInstalled } = dmmf.generatorConfig;
  const imports: writeImportStatementOptions[] = [];
  imports.push({ name: 'z', path: 'zod' });

  // Prisma should primarily be imported as a type, but if there are json fields,
  // we need to import the whole namespace because the null transformation
  // relies on the Prisma.JsonNull and Prisma.DbNull objects

  imports.push({
    name: 'Prisma',
    path: prismaClientPath,
    isTypeOnly: !(dmmf.schema.hasJsonTypes || dmmf.schema.hasDecimalTypes),
  });
  if (dmmf.schema.hasDecimalTypes && decimalJSInstalled) {
    imports.push({
      name: 'Decimal',
      path: 'decimal.js',
    });
  }
  if (dmmf.customImports) {
    imports.push(...dmmf.customImports);
  }

  writeImports(imports);
};
