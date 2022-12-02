"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgTypeStatements = void 0;
const utils_1 = require("../utils");
const getArgTypeStatements = ({ schema }) => {
    const statements = [(0, utils_1.writeHeading)(`ARGS`, 'FAT')];
    schema.outputObjectTypes.prisma
        .filter((type) => type.name === 'Query' || type.name === 'Mutation')
        .forEach((outputType) => {
        outputType.fields.forEach((field) => {
            statements.push((0, utils_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `${field.argName}`,
                        type: `z.ZodType<Prisma.Prisma.${field.argName}>`,
                        initializer: (writer) => {
                            writer.write(`z.object(`);
                            writer.inlineBlock(() => {
                                var _a;
                                writer
                                    .writeLine(`select: z.lazy(() => ${field.modelType}Select).optional(),`)
                                    .conditionalWriteLine((_a = field.linkedModel) === null || _a === void 0 ? void 0 : _a.hasRelationFields, `include: z.lazy(() => ${field.modelType}Include).optional(),`);
                                field.args.forEach((arg) => {
                                    writer.write(`${arg.name}: `);
                                    const { isOptional, isNullable } = arg;
                                    if (arg.hasMultipleTypes) {
                                        writer.write(`z.union([ `);
                                        arg.inputTypes.forEach((inputType, idx) => {
                                            const writeComma = idx !== arg.inputTypes.length - 1;
                                            (0, utils_1.writeScalarType)(writer, {
                                                inputType,
                                                writeLazy: false,
                                                writeComma,
                                            });
                                            (0, utils_1.writeNonScalarType)(writer, {
                                                inputType,
                                                writeLazy: false,
                                                writeComma,
                                            });
                                            (0, utils_1.writeNullType)(writer, {
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
                                    }
                                    else {
                                        (0, utils_1.writeScalarType)(writer, {
                                            inputType: arg.inputTypes[0],
                                            writeLazy: false,
                                            isNullable,
                                            isOptional,
                                        });
                                        (0, utils_1.writeNonScalarType)(writer, {
                                            inputType: arg.inputTypes[0],
                                            writeLazy: false,
                                            isNullable,
                                            isOptional,
                                        });
                                        (0, utils_1.writeNullType)(writer, {
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
            }));
        });
    });
    return statements;
};
exports.getArgTypeStatements = getArgTypeStatements;
//# sourceMappingURL=getArgTypeStatements.js.map