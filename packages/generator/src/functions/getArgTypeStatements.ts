// import { StructureKind } from 'ts-morph';

import { GetStatements, Statement } from '../types';
import {
  writeConstStatement,
  writeHeading,
  writeNonScalarType,
  writeScalarType,
  writeSpecialType,
} from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getArgTypeStatements: GetStatements = (dmmf) => {
  if (!dmmf.createInputTypes()) return [];

  const statements: Statement[] = [writeHeading(`ARGS`, 'FAT')];

  dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
    outputType.prismaActionFields.forEach((field) => {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${field.argName}Schema`,

              // if the model contains fields that should be omitted,
              // the type information passed to the zod schema needs to be updated.
              // By default, the type is just the prisma client type.
              // But if the model has fields that are required and should be omitted,
              // tha type needs to be updated to reflect that.
              // Otherwise typescript will complain that the required fields are missing.

              type: field.createCustomOmitFieldType()
                ? (writer) => {
                    writer.write(
                      `z.ZodType<Omit<PrismaClient.Prisma.${
                        field.argName
                      }, ${field.getOmitUnionForCustomType()}> & { `,
                    );

                    field.args.forEach((arg, idx) => {
                      if (!arg.rewriteArgWithNewType()) return;

                      const writeComma = idx < field.args.length - 1;

                      writer.write(`${arg.name}${arg.isRequired ? '' : '?'}: `);

                      if (arg.hasMultipleTypes) {
                        arg.inputTypes.forEach((inputType, idx) => {
                          const writeSeperator =
                            idx !== arg.inputTypes.length - 1;
                          writer
                            .write(`z.infer<typeof ${inputType.type}Schema>`)
                            .conditionalWrite(writeSeperator, ` | `);
                        });
                        return writer.conditionalWrite(writeComma, `,`);
                      }

                      return writer
                        .write(
                          `z.infer<typeof ${arg.inputTypes[0].type}Schema>`,
                        )
                        .conditionalWrite(arg.inputTypes[0].isList, `[]`)
                        .newLine();
                    });

                    writer.write(` }>`);
                  }
                : `z.ZodType<PrismaClient.Prisma.${field.argName}>`,
              initializer: (writer) => {
                writer.write(`z.object(`);
                writer.inlineBlock(() => {
                  writer
                    .conditionalWriteLine(
                      field.writeSelectAndIncludeArgs(),
                      `select :${field.modelType}SelectSchema.optional(),`,
                    )
                    .conditionalWriteLine(
                      field.writeSelectAndIncludeArgs() &&
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
                });
                writer.write(`)`).write(`.strict()`);
              },
            },
          ],
        }),
      );
    });
  });

  return statements;
};
