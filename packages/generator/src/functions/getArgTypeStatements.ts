import { StructureKind } from 'ts-morph';
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
      // if field has an omit field the type needs to be recreated
      // otherwise required fields would show a type error
      if (field.hasOmitFields) {
        statements.push({
          leadingTrivia: (writer) => writer.newLine(),
          kind: StructureKind.TypeAlias,
          name: `${field.argName}OmitType`,
          type: (writer) => {
            writer.inlineBlock(() => {
              writer
                .writeLine(
                  `select?: PrismaClient.Prisma.${field.linkedModel?.formattedNames.pascalCase}Select | null`,
                )
                .conditionalWriteLine(
                  field.linkedModel?.hasRelationFields,
                  `include: PrismaClient.Prisma.${field.linkedModel?.formattedNames.pascalCase}Include | null`,
                );
              field.args.forEach((arg) => {
                writer.write(`${arg.name}${arg.isRequired ? '' : '?'}: `);
                if (!arg.name.match(/create|update|upsert|delete|data/)) {
                  if (arg.inputTypes[0].type === 'Boolean') {
                    return writer.write(`boolean`).newLine();
                  }

                  return writer
                    .write(`PrismaClient.Prisma.${arg.inputTypes[0].type}`)
                    .newLine();
                }

                if (arg.hasMultipleTypes) {
                  arg.inputTypes.forEach((inputType, idx) => {
                    const writeSeperator = idx !== arg.inputTypes.length - 1;
                    writer
                      .write(`${inputType.type}OmitType`)
                      .conditionalWrite(writeSeperator, ` | `);
                  });
                  return writer.newLine();
                }

                return writer
                  .write(`${arg.inputTypes[0].type}OmitType`)
                  .conditionalWrite(arg.inputTypes[0].isList, `[]`)
                  .newLine();
              });
            });
          },
          isExported: true,
        });
      }

      const type = field.hasOmitFields
        ? `z.ZodType<${field.argName}OmitType>`
        : `z.ZodType<PrismaClient.Prisma.${field.argName}>`;

      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${field.argName}Schema`,
              type,
              initializer: (writer) => {
                writer.write(`z.object(`);
                writer.inlineBlock(() => {
                  writer
                    .writeLine(
                      `select :${field.modelType}SelectSchema.optional(),`,
                    )
                    .conditionalWriteLine(
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
