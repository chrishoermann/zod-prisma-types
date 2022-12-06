"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumStatements = void 0;
const utils_1 = require("../utils");
const getEnumStatements = ({ schema, datamodel }) => {
    const statements = [(0, utils_1.writeHeading)(`ENUMS`, 'FAT')];
    statements.push((0, utils_1.writeHeading)(`PRISMA GENERATED ENUMS`, 'SLIM'));
    schema.enumTypes.prisma.forEach(({ formattedNames, useNativeEnum, values }) => {
        if (useNativeEnum) {
            statements.push((0, utils_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `${formattedNames.pascalCase}Schema`,
                        initializer(writer) {
                            writer.write(`z.nativeEnum(Prisma.Prisma.${formattedNames.pascalCase})`);
                        },
                    },
                ],
            }));
        }
        else {
            statements.push((0, utils_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `${formattedNames.pascalCase}Schema`,
                        initializer(writer) {
                            writer.write(`z.enum([`);
                            values.forEach((value) => {
                                writer.write(`'${value}',`);
                            });
                            writer.write(`])`);
                        },
                    },
                ],
            }));
        }
    });
    statements.push((0, utils_1.writeHeading)(`CUSTOM ENUMS`, 'SLIM'));
    datamodel.enums.forEach(({ formattedNames }) => {
        statements.push((0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: `${formattedNames.pascalCase}Schema`,
                    initializer(writer) {
                        writer.write(`z.nativeEnum(Prisma.${formattedNames.pascalCase})`);
                    },
                },
            ],
        }));
    });
    return statements;
};
exports.getEnumStatements = getEnumStatements;
//# sourceMappingURL=getEnumStatements.js.map