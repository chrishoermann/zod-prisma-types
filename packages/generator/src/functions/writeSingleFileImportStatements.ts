import { writeImportStatementOptions } from '../classes';
import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileImportStatements: WriteStatements = (
  dmmf,
  { writeImports },
) => {
  const {
    prismaClientPath,
    prismaLibraryPath,
    decimalJSInstalled,
    isPrismaClientGenerator,
  } = dmmf.generatorConfig;
  const imports: writeImportStatementOptions[] = [];
  imports.push({ name: 'z', path: 'zod' });

  // If using the "prisma-client" compiler, we can import directly from the
  // runtime library to avoid importing the entire client.
  if (isPrismaClientGenerator) {
    const namesToImport = [];

    if (dmmf.schema.hasJsonTypes) {
      namesToImport.push('JsonValue');
      namesToImport.push('InputJsonValue');
      namesToImport.push('objectEnumValues');
    }

    if (dmmf.schema.hasDecimalTypes) {
      // `FileWriter.writeImports` can handle `as` statements in `name`
      namesToImport.push('Decimal as PrismaDecimal');
      namesToImport.push('DecimalJsLike');
    }

    namesToImport.forEach((name) => {
      imports.push({
        name,
        path: prismaLibraryPath,
      });
    });

    imports.push({
      name: 'Prisma',
      path: prismaClientPath,
      isTypeOnly: true,
    });
  } else {
    // Prisma should primarily be imported as a type, but if there are json fields,
    // we need to import the whole namespace because the null transformation
    // relies on the Prisma.JsonNull and Prisma.DbNull objects
    if (dmmf.schema.hasJsonTypes || dmmf.schema.hasDecimalTypes) {
      imports.push({
        name: 'Prisma',
        path: prismaClientPath,
        isTypeOnly: false,
      });
    } else {
      imports.push({
        name: 'Prisma',
        path: prismaClientPath,
        isTypeOnly: true,
      });
    }
  }

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
