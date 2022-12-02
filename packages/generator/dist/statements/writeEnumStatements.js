"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumStatements = void 0;
const writeConstStatement_1 = require("src/utils/writeConstStatement");
const writeHeading_1 = require("src/utils/writeHeading");
const getEnumStatements = (datamodel, enumStatements) => {
    datamodel.enums.forEach(({ formattedNames, generateEnumFilter, generateEnumListFilter, }) => {
        enumStatements.push((0, writeHeading_1.writeHeading)(`${formattedNames.upperCaseSpace} ENUM`, 'FAT'), (0, writeConstStatement_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: `${formattedNames.pascalCase}Type`,
                    initializer(writer) {
                        writer.writeLine(`z.nativeEnum(Prisma.${formattedNames.pascalCase})`);
                    },
                },
            ],
        }));
        if (generateEnumFilter) {
            enumStatements.push((0, writeHeading_1.writeHeading)(`${formattedNames.upperCaseSpace} - ENUM FILTER`), (0, writeConstStatement_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `Enum${formattedNames.pascalCase}FilterType`,
                        initializer(writer) {
                            writer
                                .write(`z.object(`)
                                .inlineBlock(() => {
                                writer.write(`equals: z.lazy(() => ${formattedNames.pascalCase}Type).optional(),`);
                                writer
                                    .writeLine(`in: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`)
                                    .writeLine(`.optional(),`));
                                writer
                                    .writeLine(`notIn: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`)
                                    .writeLine(`.optional(),`));
                                writer
                                    .writeLine(`not: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => NestedEnum${formattedNames.pascalCase}FilterType), z.lazy(() => ${formattedNames.pascalCase}Type)])`)
                                    .writeLine(`.optional(),`));
                            })
                                .write(`)`);
                        },
                    },
                ],
            }), (0, writeConstStatement_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `NestedEnum${formattedNames.pascalCase}FilterType`,
                        type: `z.ZodType<Prisma.NestedEnum${formattedNames.pascalCase}Filter>`,
                        initializer(writer) {
                            writer
                                .write(`z.object(`)
                                .inlineBlock(() => {
                                writer.write(`equals: z.lazy(() => ${formattedNames.pascalCase}Type).optional(),`);
                                writer
                                    .writeLine(`in: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`)
                                    .writeLine(`.optional(),`));
                                writer
                                    .writeLine(`notIn: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`)
                                    .writeLine(`.optional(),`));
                                writer
                                    .writeLine(`not: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => NestedEnum${formattedNames.pascalCase}FilterType), z.lazy(() => ${formattedNames.pascalCase}Type)])`)
                                    .writeLine(`.optional(),`));
                            })
                                .write(`)`);
                        },
                    },
                ],
            }));
        }
        if (generateEnumListFilter) {
            enumStatements.push((0, writeHeading_1.writeHeading)(`${formattedNames.upperCaseSpace} - ENUM LIST FILTER`), (0, writeConstStatement_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `Enum${formattedNames.pascalCase}NullableListFilterType`,
                        initializer(writer) {
                            writer
                                .write(`z.object(`)
                                .inlineBlock(() => {
                                writer
                                    .writeLine(`equals: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type)), z.null()])`)
                                    .writeLine(`.optional(),`));
                                writer
                                    .writeLine(`has: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.null()])`)
                                    .writeLine(`.optional(),`));
                                writer
                                    .writeLine(`hasEvery: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`)
                                    .writeLine(`.optional(),`));
                                writer
                                    .writeLine(`hasSome: z`)
                                    .withIndentationLevel(2, () => writer
                                    .writeLine(`.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`)
                                    .writeLine(`.optional(),`));
                                writer.writeLine(`isEmpty: z.boolean().optional(),`);
                            })
                                .write(`)`);
                        },
                    },
                ],
            }));
        }
    });
};
exports.getEnumStatements = getEnumStatements;
//# sourceMappingURL=writeEnumStatements.js.map