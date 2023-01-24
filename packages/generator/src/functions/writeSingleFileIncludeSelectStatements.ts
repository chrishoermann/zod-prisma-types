import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileIncludeSelectStatements: WriteStatements = (
  dmmf,
  { writer, writeHeading },
) => {
  writeHeading(`SELECT & INCLUDE`, 'FAT');

  writer.blankLine();

  dmmf.schema.outputObjectTypes.model.forEach((model) => {
    writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');

    if (model.hasRelationField()) {
      // INCLUDE SELECT ARGS SCHEMA
      // ------------------------------------------------------------
      // The args schema is used in "include" and "select" schemas
      writer
        .blankLine()
        .write(`export const ${model.name}ArgsSchema: `)
        .write(`z.ZodType<PrismaClient.Prisma.${model.name}Args> = `)
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
        .blankLine();
    }

    if (model.hasCountField()) {
      // COUNT ARGS SCHEMA
      // ------------------------------------------------------------

      // [Model]CountOutputTypeSelectSchema needs to be generated when the model has a _count field.
      // The _count field is only added when a realtion field is a list.

      writer
        .blankLine()
        .write(`export const ${model.name}CountOutputTypeArgsSchema: `)
        .write(
          `z.ZodType<PrismaClient.Prisma.${model.name}CountOutputTypeArgs> = `,
        )
        .write('z.object(')
        .inlineBlock(() => {
          writer.writeLine(
            `select: z.lazy(() => ${model.name}CountOutputTypeSelectSchema).nullish(),`,
          );
        })
        .write(`).strict()`)
        .blankLine();

      // COUNT SELECT SCHEMA
      // ------------------------------------------------------------

      writer
        .blankLine()
        .write(`export const ${model.name}CountOutputTypeSelectSchema: `)
        .write(
          `z.ZodType<PrismaClient.Prisma.${model.name}CountOutputTypeSelect> = `,
        )
        .write(`z.object(`)
        .inlineBlock(() => {
          model.fields.forEach((field) => {
            if (field.isListOutputType() && field.isObjectOutputType()) {
              writer.writeLine(`${field.name}: z.boolean().optional(),`);
            }
          });
        })
        .write(`).strict()`)
        .blankLine();
    }

    if (model.hasRelationField()) {
      // INCLUDE SCHEMA
      // ------------------------------------------------------------
      writer
        .blankLine()
        .write(`export const ${model.name}IncludeSchema: `)
        .write(`z.ZodType<PrismaClient.Prisma.${model.name}Include> = `)
        .write(`z.object(`)
        .inlineBlock(() => {
          model.fields.forEach((field) => {
            if (field.isObjectOutputType()) {
              writer
                .write(`${field.name}: `)
                .write(`z.union([`)
                .write(`z.boolean(),`)
                .conditionalWrite(
                  field.isListOutputType(),
                  `z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`,
                )
                .conditionalWrite(
                  !field.isListOutputType(),
                  `z.lazy(() => ${field.outputType.type}ArgsSchema)`,
                )
                .write(`]).optional(),`)
                .newLine();
            }
          });
        })
        .write(`).strict()`)
        .blankLine();
    }

    writer
      .blankLine()
      .write(`export const ${model.name}SelectSchema: `)
      .write(`z.ZodType<PrismaClient.Prisma.${model.name}Select> = `)
      .write(`z.object({`)
      .withIndentationLevel(1, () => {
        model.fields.forEach((field) => {
          if (field.isEnumOutputType()) {
            return writer
              .write(`${field.name}: `)
              .write(`z.boolean()`)
              .write(`.optional(),`)
              .newLine();
          }

          if (field.isListOutputType() && field.isObjectOutputType()) {
            return writer
              .write(`${field.name}: `)
              .write(`z.union([`)
              .write(`z.boolean(),`)
              .write(`z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`)
              .write(`])`)
              .write(`.optional()`)
              .write(`,`)
              .newLine();
          }

          if (field.isObjectOutputType()) {
            return writer
              .write(`${field.name}: `)
              .write(`z.union([`)
              .write(`z.boolean(),`)
              .write(`z.lazy(() => ${field.outputType.type}ArgsSchema)`)
              .write(`])`)
              .write(`.optional()`)
              .write(`,`)
              .newLine();
          }

          return writer
            .write(`${field.name}: `)
            .write(`z.boolean()`)
            .write(`.optional(),`)
            .newLine();
        });
      });

    writer.write(`})`).write(`.strict()`).blankLine();
  });
};
