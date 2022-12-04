"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputTypeStatements = void 0;
const utils_1 = require("../utils");
const getInputTypeStatements = (dmmf) => {
    const statements = [(0, utils_1.writeHeading)(`INPUT TYPES`, 'FAT')];
    dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
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
                                const { isNullable, isOptional, zodCustomErrors, zodValidatorString, zodCustomValidatorString, } = field;
                                if (field.hasMultipleTypes) {
                                    writer.write(`z.union([ `);
                                    field.inputTypes.forEach((inputType, idx) => {
                                        const writeComma = idx !== field.inputTypes.length - 1;
                                        (0, utils_1.writeScalarType)(writer, {
                                            inputType,
                                            zodCustomErrors,
                                            zodValidatorString,
                                            zodCustomValidatorString,
                                            writeComma,
                                        });
                                        (0, utils_1.writeNonScalarType)(writer, {
                                            inputType,
                                            writeComma,
                                        });
                                        (0, utils_1.writeSpecialType)(writer, {
                                            inputType,
                                            zodCustomErrors,
                                            zodCustomValidatorString,
                                            writeComma,
                                            useDecimalJS: dmmf.useDecimalJs(),
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
                                        isNullable,
                                        isOptional,
                                        zodCustomErrors,
                                        zodValidatorString,
                                        zodCustomValidatorString,
                                    });
                                    (0, utils_1.writeNonScalarType)(writer, {
                                        inputType,
                                        isNullable,
                                        isOptional,
                                    });
                                    (0, utils_1.writeSpecialType)(writer, {
                                        inputType,
                                        zodCustomErrors,
                                        zodCustomValidatorString,
                                        isNullable,
                                        isOptional,
                                        useDecimalJS: dmmf.useDecimalJs(),
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