import { StructureKind } from 'ts-morph';

import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getHelperStatements: GetStatements = ({ schema }) => {
  const statements: Statement[] = [];

  if (schema.hasDecimalTypes || schema.hasJsonTypes) {
    statements.push(writeHeading(`HELPER TYPES`, 'FAT'));
  }

  // DECIMAL
  // ------------------------------------------

  if (schema.hasDecimalTypes) {
    statements.push(
      writeHeading(`DECIMAL`, 'SLIM'),
      {
        kind: StructureKind.Interface,
        name: 'DecimalJsLike',
        isExported: true,
        properties: [
          {
            name: 'd',
            type: 'number[]',
          },
          {
            name: 'e',
            type: 'number',
          },
          {
            name: 's',
            type: 'number',
          },
        ],
      },

      writeConstStatement({
        declarations: [
          {
            name: `DECIMAL_STRING_REGEX`,
            initializer(writer) {
              writer.write(`/^[0-9.,e+\-bxffo_cp]+$|Infinity|NaN/`);
            },
          },
        ],
      }),

      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `DecimalJSLikeSchema`,
            initializer(writer) {
              writer.write(
                `z.object({ d: z.array(z.number()), e: z.number(), s: z.number() })`,
              );
            },
          },
        ],
      }),

      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `isValidDecimalInput`,
            initializer(writer) {
              writer
                .write(
                  `(v?: null | string | number | PrismaClient.Prisma.Decimal | DecimalJsLike) => `,
                )
                .inlineBlock(() => {
                  writer.writeLine(`if (!v) return false;`);
                  writer.writeLine(`return (`);
                  writer.withIndentationLevel(2, () => {
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
                  });
                  writer.writeLine(`)`);
                });
            },
          },
        ],
      }),
    );
  }

  // JSON
  // --------------------------------------------

  if (schema.hasJsonTypes) {
    statements.push(
      writeHeading(`JSON`, 'SLIM'),
      {
        leadingTrivia: (writer) => writer.newLine(),
        kind: StructureKind.TypeAlias,
        isExported: true,
        name: 'NullableJsonInput',
        type: "PrismaClient.Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | PrismaClient.Prisma.NullTypes.DbNull | PrismaClient.Prisma.NullTypes.JsonNull",
      },
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `transformJsonNull`,
            initializer(writer) {
              writer
                .writeLine(`(v?: NullableJsonInput) => `)
                .inlineBlock(() => {
                  writer.writeLine(
                    `if (!v || v === 'DbNull') return PrismaClient.Prisma.DbNull;`,
                  );
                  writer.writeLine(
                    `if (v === 'JsonNull') return PrismaClient.Prisma.JsonNull;`,
                  );
                  writer.writeLine(`return v;`);
                });
            },
          },
        ],
      }),

      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `JsonValue`,
            type: 'z.ZodType<PrismaClient.Prisma.JsonValue>',
            initializer(writer) {
              writer.writeLine(`z.union([`);
              writer.writeLine(`z.string(),`);
              writer.writeLine(`z.number(),`);
              writer.writeLine(`z.boolean(),`);
              writer.writeLine(`z.lazy(() => z.array(JsonValue)),`);
              writer.writeLine(`z.lazy(() => z.record(JsonValue)),`);
              writer.write(`])`);
            },
          },
        ],
      }),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `NullableJsonValue`,
            initializer(writer) {
              writer
                .write(`z`)
                .newLine()
                .write(
                  `.union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])`,
                )
                .writeLine('.nullable()')
                .write(`.transform((v) => transformJsonNull(v))`);
            },
          },
        ],
      }),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `InputJsonValue`,
            type: 'z.ZodType<PrismaClient.Prisma.InputJsonValue>',
            initializer(writer) {
              writer.writeLine(`z.union([`);
              writer.writeLine(`z.string(),`);
              writer.writeLine(`z.number(),`);
              writer.writeLine(`z.boolean(),`);
              writer.writeLine(
                `z.lazy(() => z.array(InputJsonValue.nullable())),`,
              );
              writer.writeLine(
                `z.lazy(() => z.record(InputJsonValue.nullable())),`,
              );
              writer.write(`])`);
            },
          },
        ],
      }),
    );
  }

  return statements;
};
