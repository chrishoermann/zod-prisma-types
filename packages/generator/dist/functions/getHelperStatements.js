"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelperStatements = void 0;
const utils_1 = require("../utils");
const getHelperStatements = ({ schema }) => {
    const statements = [];
    if (schema.hasJsonTypes) {
        statements.push((0, utils_1.writeHeading)(`HELPER TYPES`, 'FAT'), (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: `JsonValue`,
                    type: 'z.ZodType<Prisma.Prisma.JsonValue>',
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
        }), (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: `InputJsonValue`,
                    type: 'z.ZodType<Prisma.Prisma.InputJsonValue>',
                    initializer(writer) {
                        writer.writeLine(`z.union([`);
                        writer.writeLine(`z.string(),`);
                        writer.writeLine(`z.number(),`);
                        writer.writeLine(`z.boolean(),`);
                        writer.writeLine(`z.lazy(() => z.array(InputJsonValue.nullable())),`);
                        writer.writeLine(`z.lazy(() => z.record(InputJsonValue.nullable())),`);
                        writer.write(`])`);
                    },
                },
            ],
        }));
    }
    return statements;
};
exports.getHelperStatements = getHelperStatements;
//# sourceMappingURL=getHelperStatements.js.map