import { type WriteStatements } from '../types';
import { writeZodImport } from '.';
import { getConfig } from '../config';
import { getExtendedDMMF } from '../classes';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileImportStatements: WriteStatements = ({
  writer,
  writeImport,
}) => {
  const {
    prismaClientPath,
    prismaLibraryPath,
    decimalJSInstalled,
    isPrismaClientGenerator,
    prismaVersion,
  } = getConfig();

  const dmmf = getExtendedDMMF();

  writeZodImport(writeImport);

  // Prisma 7 no longer exports `objectEnumValues`, so the json null values
  // are read off the Prisma namespace at runtime, like the multi-file output does.
  if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
    if (dmmf.schema.hasDecimalTypes) {
      writeImport(`{ Decimal as PrismaDecimal }`, `${prismaLibraryPath}`);
    }

    if (dmmf.schema.hasJsonTypes || dmmf.schema.hasDecimalTypes) {
      writeImport(`{ Prisma }`, `${prismaClientPath}`);
    } else {
      writeImport(`type { Prisma }`, `${prismaClientPath}`);
    }
  } else if (isPrismaClientGenerator) {
    // If using the "prisma-client" compiler, we can import directly from the
    // runtime library to avoid importing the entire client.
    const namesToImport = [];

    if (dmmf.schema.hasJsonTypes) {
      namesToImport.push('JsonValue');
      namesToImport.push('InputJsonValue');
      namesToImport.push('objectEnumValues');
    }

    if (dmmf.schema.hasDecimalTypes) {
      namesToImport.push('Decimal as PrismaDecimal');
      namesToImport.push('DecimalJsLike');
    }

    if (namesToImport.length > 0) {
      writeImport(`{ ${namesToImport.join(', ')} }`, `${prismaLibraryPath}`);
    }
    writeImport(`type { Prisma }`, `${prismaClientPath}`);
  } else {
    // Prisma should primarily be imported as a type, but if there are json fields,
    // we need to import the whole namespace because the null transformation
    // relies on the Prisma.JsonNull and Prisma.DbNull objects
    if (dmmf.schema.hasJsonTypes || dmmf.schema.hasDecimalTypes) {
      writeImport(`{ Prisma }`, `${prismaClientPath}`);
    } else {
      writeImport(`type { Prisma }`, `${prismaClientPath}`);
    }
  }

  if (dmmf.schema.hasDecimalTypes && decimalJSInstalled) {
    writeImport(`Decimal`, 'decimal.js');
  }

  if (dmmf.customImports) {
    dmmf.customImports.forEach((statement) => {
      writer.writeLine(statement);
    });
  }
};
