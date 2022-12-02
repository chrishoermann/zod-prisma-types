"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringFilterBaseStatements = void 0;
const ts_morph_1 = require("ts-morph");
const utils_1 = require("../utils");
const filterTypes = (options) => (writer) => {
    writer.inlineBlock(() => {
        writer
            .write(`equals?: string`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
            .write(`;`)
            .newLine();
        writer
            .write(`in?: Prisma.Prisma.Enumerable<string>`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
            .write(`;`)
            .newLine();
        writer
            .write(`notIn?: Prisma.Prisma.Enumerable<string>`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
            .write(`;`)
            .newLine();
        writer.writeLine(`lt?: string;`);
        writer.writeLine(`lte?: string;`);
        writer.writeLine(`gt?: string;`);
        writer.writeLine(`gte?: string;`);
        writer.writeLine(`contains?: string;`);
        writer.writeLine(`startsWith?: string;`);
        writer.writeLine(`endsWith?: string;`);
        writer.writeLine(`mode?: Prisma.Prisma.QueryMode;`);
        if (options === null || options === void 0 ? void 0 : options.aggregates) {
            writer
                .write(`not?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedStringNullableWithAggregatesFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedStringWithAggregatesFilter`)
                .write(` | string`)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
                .write(`;`)
                .newLine();
            writer
                .write(`_count?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`;`)
                .newLine();
            writer
                .write(`_min?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedStringNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedStringFilter`)
                .write(`;`)
                .newLine();
            writer
                .write(`_max?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedStringNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedStringFilter`)
                .write(`;`)
                .newLine();
        }
        else {
            writer
                .write(`not?: NestedStringFilter | string`)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
                .write(`;`)
                .newLine();
        }
    });
};
const filterInitializer = (options) => (writer) => {
    writer
        .write(`z.object(`)
        .inlineBlock(() => {
        writer
            .write(`equals: z.string().optional()`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
        writer
            .write(`in: z.union([z.string(), z.string().array()]).optional()`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
        writer
            .write(`notIn: z.union([z.string(), z.string().array()]).optional()`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
        writer.writeLine(`lt: z.string().optional(),`);
        writer.writeLine(`lte: z.string().optional(),`);
        writer.writeLine(`gt: z.string().optional(),`);
        writer.writeLine(`gte: z.string().optional(),`);
        writer.writeLine(`contains: z.string().optional(),`);
        writer.writeLine(`startsWith: z.string().optional(),`);
        writer.writeLine(`endsWith: z.string().optional(),`);
        writer.writeLine(`queryMode: z.lazy(()=> QueryMode),`);
        if (options === null || options === void 0 ? void 0 : options.aggregates) {
            writer
                .write(`not: z.union([z.string(), z.lazy(() => `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedStringNullableWithAggregatesFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedStringWithAggregatesFilter`)
                .write(`)]).optional()`)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_count: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_min: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedStringNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedStringFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_max: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedStringNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedStringFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
        }
        else {
            writer
                .write(`not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional()`)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
                .write(`,`);
        }
    })
        .write(`)`);
};
const getStringFilterBaseStatements = () => {
    return [
        (0, utils_1.writeHeading)(`STRING FILTERS`, 'FAT'),
        (0, utils_1.writeHeading)(`STRING FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'StringFilter',
            type: filterTypes(),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'StringFilter',
                    type: 'z.ZodType<StringFilter>',
                    initializer: filterInitializer(),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED STRING FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedStringFilter',
            type: filterTypes(),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedStringFilter',
                    type: 'z.ZodType<NestedStringFilter>',
                    initializer: filterInitializer(),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`STRING WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'StringWithAggregatesFilter',
            type: filterTypes({ aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'StringWithAggregatesFilter',
                    type: 'z.ZodType<StringWithAggregatesFilter>',
                    initializer: filterInitializer({ aggregates: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED STRING WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedStringWithAggregatesFilter',
            type: filterTypes({ aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedStringWithAggregatesFilter',
                    type: 'z.ZodType<NestedStringWithAggregatesFilter>',
                    initializer: filterInitializer({ aggregates: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`STRING NULLABLE FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'StringNullableFilter',
            type: filterTypes({ nullable: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'StringNullableFilter',
                    type: 'z.ZodType<StringNullableFilter>',
                    initializer: filterInitializer({ nullable: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED NULLABLE STRING FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedStringNullableFilter',
            type: filterTypes({ nullable: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedStringNullableFilter',
                    type: 'z.ZodType<NestedStringNullableFilter>',
                    initializer: filterInitializer({ nullable: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`STRING NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'StringNullableWithAggregatesFilter',
            type: filterTypes({ nullable: true, aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'StringNullableWithAggregatesFilter',
                    type: 'z.ZodType<StringNullableWithAggregatesFilter>',
                    initializer: filterInitializer({
                        nullable: true,
                        aggregates: true,
                    }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED STRING NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedStringNullableWithAggregatesFilter',
            type: filterTypes({ nullable: true, aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedStringNullableWithAggregatesFilter',
                    type: 'z.ZodType<NestedStringNullableWithAggregatesFilter>',
                    initializer: filterInitializer({
                        nullable: true,
                        aggregates: true,
                    }),
                },
            ],
        }),
    ].flat();
};
exports.getStringFilterBaseStatements = getStringFilterBaseStatements;
//# sourceMappingURL=getStringFilterBaseStatements.js.map