"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncludeSelectStatements = void 0;
const utils_1 = require("../utils");
const getIncludeSelectStatements = (dmmf) => {
    if (!dmmf.createInputTypes())
        return [];
    const statements = [(0, utils_1.writeHeading)(`SELECT & INCLUDE`, 'FAT')];
    dmmf.datamodel.models.forEach((model) => {
        statements.push((0, utils_1.writeHeading)(`${model.formattedNames.upperCaseSpace}`, 'SLIM'));
        if (model.hasRelationFields) {
            statements.push((0, utils_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `${model.formattedNames.pascalCase}ArgsSchema`,
                        type: `z.ZodType<Prisma.Prisma.${model.formattedNames.pascalCase}Args>`,
                        initializer(writer) {
                            writer
                                .writeLine(`z.object({`)
                                .write(`select: `)
                                .write(`z.lazy(() => ${model.formattedNames.pascalCase}SelectSchema).optional(),`)
                                .newLine()
                                .conditionalWrite(model.hasRelationFields, `include: `)
                                .conditionalWrite(model.hasRelationFields, `z.lazy(() => ${model.formattedNames.pascalCase}IncludeSchema).optional(),`)
                                .newLine()
                                .write(`})`)
                                .write(`.strict()`);
                        },
                    },
                ],
            }));
        }
        statements.push((0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: `${model.formattedNames.pascalCase}SelectSchema`,
                    type: `z.ZodType<Prisma.Prisma.${model.formattedNames.pascalCase}Select>`,
                    initializer(writer) {
                        writer.write(`z.object({`);
                        [...model.scalarFields, ...model.enumFields].forEach((field) => {
                            writer
                                .write(`${field.formattedNames.camelCase}: `)
                                .write(`z.boolean().optional(),`)
                                .newLine();
                        });
                        model.relationFields.forEach((field) => {
                            writer
                                .write(`${field.formattedNames.camelCase}: `)
                                .write(`z.union([`)
                                .write(`z.boolean(),`)
                                .write(`z.lazy(() => ${field.type}ArgsSchema)`)
                                .write(`]).optional(),`)
                                .newLine();
                        });
                        writer.write(`})`).write(`.strict()`);
                    },
                },
            ],
        }));
        if (model.hasRelationFields) {
            statements.push((0, utils_1.writeConstStatement)({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                    {
                        name: `${model.formattedNames.pascalCase}IncludeSchema`,
                        type: `z.ZodType<Prisma.Prisma.${model.formattedNames.pascalCase}Include>`,
                        initializer(writer) {
                            writer.write(`z.object({`);
                            model.relationFields.forEach((field) => {
                                writer
                                    .write(`${field.formattedNames.camelCase}: `)
                                    .write(`z.union([`)
                                    .write(`z.boolean(),`)
                                    .write(`z.lazy(() => ${field.type}ArgsSchema)`)
                                    .write(`]).optional(),`)
                                    .newLine();
                            });
                            writer.write(`})`).write(`.strict()`);
                        },
                    },
                ],
            }));
        }
    });
    return statements;
};
exports.getIncludeSelectStatements = getIncludeSelectStatements;
//# sourceMappingURL=getIncludeSelectStatements.js.map