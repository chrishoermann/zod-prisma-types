"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelStatements = void 0;
const utils_1 = require("../utils");
const getModelStatements = (dmmf) => {
    const statements = [(0, utils_1.writeHeading)(`MODELS`, 'FAT')];
    dmmf.datamodel.models.forEach((model) => {
        statements.push((0, utils_1.writeHeading)(`${model.formattedNames.upperCaseSpace}`, 'SLIM'), (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: `${model.formattedNames.pascalCase}`,
                    initializer(writer) {
                        writer.write(`z.object({`);
                        [...model.enumFields, ...model.scalarFields].forEach((field) => {
                            if (field.clearedDocumentation) {
                                (0, utils_1.writeJsDoc)(writer, field.clearedDocumentation);
                            }
                            if (field.zodCustomValidatorString) {
                                return writer
                                    .write(`${field.formattedNames.camelCase}: `)
                                    .write(field.zodCustomValidatorString)
                                    .conditionalWrite(field.isList, `.array()`)
                                    .conditionalWrite(field.isNullable, `.nullable()`)
                                    .write(`,`)
                                    .newLine();
                            }
                            if (field.kind === 'enum') {
                                return writer
                                    .write(`${field.formattedNames.camelCase}: `)
                                    .write(field.zodType)
                                    .conditionalWrite(field.isList, `.array()`)
                                    .conditionalWrite(field.isNullable, `.nullable()`)
                                    .write(`,`)
                                    .newLine();
                            }
                            if (field.isJsonType) {
                                return writer
                                    .write(`${field.formattedNames.camelCase}: `)
                                    .write(`JsonValue`)
                                    .conditionalWrite(field.isList, `.array()`)
                                    .conditionalWrite(field.isNullable, `.nullable()`)
                                    .write(`,`)
                                    .newLine();
                            }
                            if (field.isBytesType) {
                                return writer
                                    .write(`${field.formattedNames.camelCase}: `)
                                    .write(`z.instanceof(Buffer)`)
                                    .conditionalWrite(field.isList, `.array()`)
                                    .conditionalWrite(field.isNullable, `.nullable()`)
                                    .write(`,`)
                                    .newLine();
                            }
                            if (field.isDecimalType && dmmf.useDecimalJs()) {
                                return writer
                                    .write(`${field.formattedNames.camelCase}: `)
                                    .write(`z.number(`)
                                    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors)
                                    .write(`)`)
                                    .write(`.refine((v) => Decimal.isDecimal(v),`)
                                    .write(` { message: 'Field "${field.formattedNames.original}" must be a Decimal', `)
                                    .write(`path: ['Models', '${model.formattedNames.pascalCase}']`)
                                    .write(` })`)
                                    .conditionalWrite(field.isList, `.array()`)
                                    .conditionalWrite(field.isNullable, `.nullable()`)
                                    .write(`,`)
                                    .newLine();
                            }
                            if (field.isDecimalType && !dmmf.useDecimalJs()) {
                                return writer
                                    .write(`${field.formattedNames.camelCase}: `)
                                    .write(`z.number(`)
                                    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors)
                                    .write(`)`)
                                    .conditionalWrite(field.isList, `.array()`)
                                    .conditionalWrite(field.isNullable, `.nullable()`)
                                    .write(`,`)
                                    .newLine();
                            }
                            return writer
                                .write(`${field.formattedNames.camelCase}: `)
                                .write(`z.${field.zodType}(`)
                                .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors)
                                .write(`)`)
                                .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString)
                                .conditionalWrite(field.isList, `.array()`)
                                .conditionalWrite(field.isNullable, `.nullable()`)
                                .write(`,`)
                                .newLine();
                        });
                        writer.write(`})`);
                    },
                },
            ],
        }));
    });
    return statements;
};
exports.getModelStatements = getModelStatements;
//# sourceMappingURL=getModelStatements.js.map