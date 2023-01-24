import { type WriteStatements } from '../types';
import {
  writeNonScalarType,
  writeScalarType,
  writeSpecialType,
} from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileArgTypeStatements: WriteStatements = (
  dmmf,
  { writer, writeHeading },
) => {
  writeHeading(`ARGS`, 'FAT');

  dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
    outputType.prismaActionFields.forEach((field) => {
      // if the model contains fields that should be omitted,
      // the type information passed to the zod schema needs to be updated.
      // By default, the type is just the prisma client type.
      // But if the model has fields that are required and should be omitted,
      // the type needs to be updated to reflect that.
      // Otherwise typescript will complain that the required fields are missing.

      const type = field.createCustomOmitFieldArgType()
        ? `z.ZodType<Omit<PrismaClient.Prisma.${
            field.argName
          }, ${field.getOmitUnionForCustomArgType()}> & { ${field.getTypeForCustomArgsType()} }>`
        : `z.ZodType<PrismaClient.Prisma.${field.argName}>`;

      writer
        .blankLine()
        .write(`export const ${field.argName}Schema: `)
        .write(type)
        .write(` = `)
        .write(`z.object(`)
        .inlineBlock(() => {
          writer
            .conditionalWriteLine(
              field.includeInSelectAndIncludeArgs(),
              `select: ${field.modelType}SelectSchema.optional(),`,
            )
            .conditionalWriteLine(
              field.includeInSelectAndIncludeArgs() &&
                field.linkedModel?.hasRelationFields,
              `include: ${field.modelType}IncludeSchema.optional(),`,
            );
          field.args.forEach((arg) => {
            writer.write(`${arg.name}: `);

            const { isOptional, isNullable } = arg;

            if (arg.hasMultipleTypes) {
              writer.write(`z.union([ `);

              arg.inputTypes.forEach((inputType, idx) => {
                const writeComma = idx !== arg.inputTypes.length - 1;

                writeScalarType(writer, {
                  inputType,
                  writeLazy: false,
                  writeComma,
                });
                writeNonScalarType(writer, {
                  inputType,
                  writeLazy: false,
                  writeComma,
                });
                writeSpecialType(writer, {
                  inputType,
                  writeLazy: false,
                  writeComma,
                });
              });

              writer
                .write(` ])`)
                .conditionalWrite(arg.isOptional, `.optional()`)
                .conditionalWrite(arg.isNullable, `.nullable()`)
                .write(`,`);
            } else {
              writeScalarType(writer, {
                inputType: arg.inputTypes[0],
                writeLazy: false,
                isNullable,
                isOptional,
              });
              writeNonScalarType(writer, {
                inputType: arg.inputTypes[0],
                writeLazy: false,
                isNullable,
                isOptional,
              });
              writeSpecialType(writer, {
                inputType: arg.inputTypes[0],
                writeLazy: false,
                isNullable,
                isOptional,
              });
            }

            writer.newLine();
          });
        })
        .write(`).strict()`)
        .blankLine();
    });
  });
};
