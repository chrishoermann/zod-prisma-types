import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileEnumStatements: WriteStatements = (
  dmmf,
  { writer, writeHeading },
) => {
  writeHeading(`ENUMS`, 'FAT');

  dmmf.schema.enumTypes.prisma.forEach(({ useNativeEnum, values, name }) => {
    if (useNativeEnum) {
      writer
        .blankLine()
        .writeLine(
          `export const ${name}Schema = z.nativeEnum(PrismaClient.Prisma.${name})`,
        );
    } else {
      writer.blankLine().write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });
      writer
        .write(`])`)
        .conditionalWrite(
          name.includes('Nullable'),
          `.transform((v) => transformJsonNull(v))`,
        );
    }
  });

  dmmf.datamodel.enums.forEach(({ name }) => {
    writer
      .blankLine()
      .writeLine(
        `export const ${name}Schema = z.nativeEnum(PrismaClient.${name})`,
      )
      .blankLine()
      .writeLine(
        `export type ${name}Type = \`\${z.infer<typeof ${name}Schema>}\``,
      );
  });
};
