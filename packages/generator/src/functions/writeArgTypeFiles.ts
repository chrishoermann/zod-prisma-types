import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import {
  writeNonScalarType,
  writeScalarType,
  writeSpecialType,
} from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeArgTypeFiles: CreateFiles = async ({
  outputPath,
  extendedDMMF,
}) => {
  if (!extendedDMMF.createInputTypes()) return;

  const { inputTypePath, outputTypePath, prismaClientPath } =
    extendedDMMF.generatorConfig;

  // WRITE INDEX FILE
  // ------------------------------------------------------------
  const indexFileWriter = new FileWriter();

  const path = indexFileWriter.createPath(`${outputPath}/${outputTypePath}`);

  if (path) {
    indexFileWriter.createFile(`${path}/index.ts`, ({ writeExport }) => {
      extendedDMMF.schema.outputObjectTypes.model.forEach((model) => {
        if (model.hasRelationField()) {
          writeExport(
            `{ ${model.name}ArgsSchema }`,
            `./${model.name}ArgsSchema`,
          );
        }
      });
      extendedDMMF.schema.outputObjectTypes.argTypes.forEach((outputType) => {
        outputType.prismaActionFields.forEach((field) => {
          writeExport(`{ ${field.argName}Schema }`, `./${field.argName}Schema`);
        });
      });
    });

    ////////////////////////////////////////////////////
    // INCLUDE SELECT ARGS
    ////////////////////////////////////////////////////

    extendedDMMF.schema.outputObjectTypes.model.forEach((model) => {
      if (model.hasRelationField()) {
        // INCLUDE SELECT ARGS SCHEMA
        // ------------------------------------------------------------

        const argsSchemaWriter = new FileWriter();

        argsSchemaWriter.createFile(
          `${path}/${model.name}ArgsSchema.ts`,
          ({ writer, writeImport }) => {
            writeImport('{ z }', 'zod');
            writeImport('{ Prisma }', prismaClientPath);
            writeImport(
              `{ ${model.name}SelectSchema }`,
              `../${inputTypePath}/${model.name}SelectSchema`,
            );
            writeImport(
              `{ ${model.name}IncludeSchema }`,
              `../${inputTypePath}/${model.name}IncludeSchema`,
            );

            writer
              .blankLine()
              .write(`export const ${model.name}ArgsSchema: `)
              .write(`z.ZodType<Prisma.${model.name}Args> = `)
              .write(`z.object(`)
              .inlineBlock(() => {
                writer
                  .write(`select: `)
                  .write(`z.lazy(() => ${model.name}SelectSchema).optional(),`)
                  .newLine()
                  .conditionalWrite(
                    model.hasRelationField(),
                    `include: z.lazy(() => ${model.name}IncludeSchema).optional(),`,
                  );
              })
              .write(`).strict()`)
              .blankLine()
              .writeLine(`export default ${model.name}SelectSchema`);
          },
        );
      }

      if (model.hasCountField()) {
        // COUNT ARGS SCHEMA
        // ------------------------------------------------------------

        // [Model]CountOutputTypeSelectSchema needs to be generated when the model has a _count field.
        // The _count field is only added when a realtion field is a list.
        const countArgsSchemaWriter = new FileWriter();

        countArgsSchemaWriter.createFile(
          `${path}/${model.name}CountOutputTypeArgsSchema.ts`,
          ({ writer, writeImport }) => {
            writeImport('{ z }', 'zod');
            writeImport('{ Prisma }', prismaClientPath);
            writeImport(
              `{ ${model.name}CountOutputTypeSelectSchema }`,
              `./${model.name}CountOutputTypeSelectSchema`,
            );

            writer
              .blankLine()
              .write(`export const ${model.name}CountOutputTypeArgsSchema: `)
              .write(`z.ZodType<Prisma.${model.name}CountOutputTypeArgs> = `)
              .write('z.object({')
              .inlineBlock(() => {
                writer
                  .write('select: z.lazy(() => ')
                  .write(`${model.name}CountOutputTypeSelectSchema`)
                  .write(').nullish(),')
                  .newLine();
              })
              .write(`).strict()`)
              .blankLine()
              .writeLine(
                `export default ${model.name}CountOutputTypeSelectSchema`,
              );
          },
        );

        // COUNT SELECT SCHEMA
        // ------------------------------------------------------------

        new FileWriter().createFile(
          `${path}/${model.name}CountOutputTypeSelectSchema.ts`,

          ({ writer, writeImport }) => {
            writeImport('{ z }', 'zod');
            writeImport('{ Prisma }', prismaClientPath);

            writer
              .blankLine()
              .write(`export const ${model.name}CountOutputTypeSelectSchema: `)
              .write(`z.ZodType<Prisma.${model.name}CountOutputTypeSelect> = `)
              .write(`z.object({`)
              .inlineBlock(() => {
                model.fields.forEach((field) => {
                  if (field.isListOutputType() && field.isObjectOutputType()) {
                    writer
                      .write(`${field.name}: `)
                      .write(`z.boolean().optional()`)
                      .write(`,`)
                      .newLine();
                  }
                });
              })
              .write(`).strict()`)
              .blankLine()
              .writeLine(
                `export default ${model.name}CountOutputTypeSelectSchema`,
              );
          },
        );
      }
    });

    extendedDMMF.schema.outputObjectTypes.argTypes.forEach((outputType) => {
      outputType.prismaActionFields.forEach((field) => {
        new FileWriter().createFileFromObject({
          path: `${path}/${field.argName}Schema.ts`,
          imports: new Set([
            `import { z } from 'zod';`,
            `import { Prisma } from '${prismaClientPath}';`,
            ...field.argTypeImports,
          ]),
          name: `${field.argName}Schema`,
          type: field.createCustomOmitFieldType()
            ? `z.ZodType<Omit<Prisma.${
                field.argName
              }, ${field.getOmitUnionForCustomType()}> & { ${field.getOmitArgsForCustomType()} }>`
            : `z.ZodType<Prisma.${field.argName}>`,
          content: (writer) => {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                writer
                  .conditionalWriteLine(
                    field.writeSelectAndIncludeArgs(),
                    `select: ${field.modelType}SelectSchema.optional(),`,
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
              })
              .write(`).strict()`);
          },
          defaultExport: `${field.argName}Schema`,
        });
      });
    });
  }
};
