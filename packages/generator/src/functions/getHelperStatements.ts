import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getHelperStatements: GetStatements = ({ schema }) => {
  const statements: Statement[] = [];

  if (schema.hasJsonTypes) {
    statements.push(
      writeHeading(`HELPER TYPES`, 'FAT'),
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
              writer.write(`])`).write('.nullable()');
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
