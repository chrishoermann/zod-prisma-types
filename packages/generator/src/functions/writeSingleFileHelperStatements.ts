import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileHelperStatements: WriteStatements = (
  dmmf,
  { writer, writeHeading },
) => {
  writeHeading('HELPER FUNCTIONS', 'FAT');

  // TRANSFORM JSON NULL
  // ------------------------------------------------------------
  if (dmmf.schema.hasJsonTypes) {
    writeHeading(`JSON`, 'SLIM');

    writer
      .newLine()
      .write(`export type NullableJsonInput = `)
      .write(`PrismaClient.Prisma.JsonValue | `)
      .write(`null | `)
      .write(`'JsonNull' | `)
      .write(`'DbNull' | `)
      .write(`PrismaClient.Prisma.NullTypes.DbNull | `)
      .write(`PrismaClient.Prisma.NullTypes.JsonNull;`)
      .blankLine()
      .write(`export const transformJsonNull = (v?: NullableJsonInput) => `)
      .inlineBlock(() => {
        writer
          .writeLine(
            `if (!v || v === 'DbNull') return PrismaClient.Prisma.DbNull;`,
          )
          .writeLine(
            `if (v === 'JsonNull') return PrismaClient.Prisma.JsonNull;`,
          )
          .writeLine(`return v;`);
      });

    // JSON VALUE
    // ------------------------------------------------------------

    writer
      .blankLine()
      .writeLine(
        `export const JsonValue: z.ZodType<PrismaClient.Prisma.JsonValue> = z.union([`,
      )
      .withIndentationLevel(1, () => {
        writer
          .writeLine(`z.string(),`)
          .writeLine(`z.number(),`)
          .writeLine(`z.boolean(),`)
          .writeLine(`z.lazy(() => z.array(JsonValue)),`)
          .writeLine(`z.lazy(() => z.record(JsonValue)),`);
      })
      .writeLine(`])`);

    // NULLABLE JSON VALUE
    // ------------------------------------------------------------

    writer
      .blankLine()
      .writeLine(`export const NullableJsonValue = z`)
      .withIndentationLevel(1, () => {
        writer
          .writeLine(
            `.union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])`,
          )
          .writeLine('.nullable()')
          .writeLine(`.transform((v) => transformJsonNull(v))`);
      });

    // NULLABLE JSON INPUT
    // ------------------------------------------------------------

    writer
      .blankLine()
      .writeLine(
        `export const InputJsonValue: z.ZodType<PrismaClient.Prisma.InputJsonValue> = z.union([`,
      )
      .withIndentationLevel(1, () => {
        writer
          .writeLine(`z.string(),`)
          .writeLine(`z.number(),`)
          .writeLine(`z.boolean(),`)
          .writeLine(`z.lazy(() => z.array(InputJsonValue.nullable())),`)
          .writeLine(`z.lazy(() => z.record(InputJsonValue.nullable())),`);
      })
      .write(`])`)
      .blankLine();
  }

  if (dmmf.schema.hasDecimalTypes) {
    writeHeading(`DECIMAL`, 'SLIM');

    // DECIMAL JS LIKE
    // ------------------------------------------------------------

    writer
      .blankLine()
      .writeLine(
        `export const DecimalJSLikeSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() })`,
      );

    writer
      .blankLine()
      .writeLine(
        `export const DecimalJSLikeListSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() }).array()`,
      );

    writer
      .blankLine()
      .writeLine(
        `export const DECIMAL_STRING_REGEX = /^[0-9.,e+\-bxffo_cp]+$|Infinity|NaN/`,
      )
      .blankLine()
      .writeLine(`export const isValidDecimalInput =`)
      .withIndentationLevel(1, () => {
        writer
          .writeLine(
            `(v?: null | string | number | PrismaClient.Prisma.Decimal | DecimalJsLike) =>`,
          )
          .inlineBlock(() => {
            writer
              .writeLine(`if (!v) return false;`)
              .writeLine(`return (`)
              .withIndentationLevel(2, () => {
                writer
                  .writeLine(
                    `(typeof v === 'object' && PrismaClient.Prisma.Decimal.isDecimal(v)) ||`,
                  )
                  .writeLine(
                    `(typeof v === 'object' && 'd' in v && 'e' in v && 's' in v) ||`,
                  )
                  .writeLine(
                    `(typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||`,
                  )
                  .writeLine(`typeof v === 'number'`);
              })
              .writeLine(`)`);
          });
      });
  }
};
