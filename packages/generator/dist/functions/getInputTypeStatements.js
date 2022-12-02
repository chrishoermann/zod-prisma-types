"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputTypeStatements = void 0;
const utils_1 = require("../utils");
const getInputTypeStatements = ({ schema }) => {
    const statements = [(0, utils_1.writeHeading)(`INPUT TYPES`, 'FAT')];
    schema.inputObjectTypes.prisma.forEach((inputType) => {
        statements.push((0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: `${inputType.name}`,
                    type: `z.ZodType<Prisma.Prisma.${inputType.name}>`,
                    initializer: (writer) => {
                        writer.write(`z.object(`);
                        writer.inlineBlock(() => {
                            inputType.fields.forEach((field) => {
                                writer.write(`${field.name}: `);
                                const { isNullable, isOptional, zodCustomErrors, zodValidatorString, } = field;
                                if (field.hasMultipleTypes) {
                                    writer.write(`z.union([ `);
                                    field.inputTypes.forEach((inputType, idx) => {
                                        const writeComma = idx !== field.inputTypes.length - 1;
                                        (0, utils_1.writeScalarType)(writer, {
                                            inputType,
                                            zodCustomErrors,
                                            zodValidatorString,
                                            writeLazy: !field.isJsonType,
                                            writeComma,
                                        });
                                        (0, utils_1.writeNonScalarType)(writer, {
                                            inputType,
                                            zodCustomErrors,
                                            zodValidatorString,
                                            writeLazy: !field.isJsonType,
                                            writeComma,
                                        });
                                        (0, utils_1.writeNullType)(writer, {
                                            inputType,
                                            zodCustomErrors,
                                            zodValidatorString,
                                            writeLazy: true,
                                            writeComma,
                                        });
                                    });
                                    writer
                                        .write(` ])`)
                                        .conditionalWrite(!field.isRequired, `.optional()`)
                                        .conditionalWrite(field.isNullable, `.nullable()`)
                                        .write(`,`);
                                }
                                else {
                                    const inputType = field.inputTypes[0];
                                    (0, utils_1.writeScalarType)(writer, {
                                        inputType,
                                        writeLazy: false,
                                        isNullable,
                                        isOptional,
                                        zodCustomErrors,
                                        zodValidatorString,
                                    });
                                    (0, utils_1.writeNonScalarType)(writer, {
                                        inputType,
                                        writeLazy: !field.isJsonType,
                                        isNullable,
                                        isOptional,
                                        zodCustomErrors,
                                        zodValidatorString,
                                    });
                                    (0, utils_1.writeNullType)(writer, {
                                        inputType,
                                        writeLazy: false,
                                        isNullable,
                                        isOptional,
                                        zodCustomErrors,
                                        zodValidatorString,
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
    return statements;
};
exports.getInputTypeStatements = getInputTypeStatements;
//# sourceMappingURL=getInputTypeStatements.js.map