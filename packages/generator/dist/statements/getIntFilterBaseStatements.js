"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntFilterBaseStatements = void 0;
const ts_morph_1 = require("ts-morph");
const utils_1 = require("../utils");
const filterTypes = (options) => (writer) => {
    writer.inlineBlock(() => {
        writer
            .write(`equals?: number`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
            .write(`;`)
            .newLine();
        writer
            .write(`in?: Prisma.Prisma.Enumerable<number>`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
            .write(`;`)
            .newLine();
        writer
            .write(`notIn?: Prisma.Prisma.Enumerable<number>`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, ` | null`)
            .write(`;`)
            .newLine();
        writer.writeLine(`lt?: number;`);
        writer.writeLine(`lte?: number;`);
        writer.writeLine(`gt?: number;`);
        writer.writeLine(`gte?: number;`);
        if (options === null || options === void 0 ? void 0 : options.aggregates) {
            writer
                .write(`not?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableWithAggregatesFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntWithAggregatesFilter`)
                .write(` | number`)
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
                .write(`_avg?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`;`)
                .newLine();
            writer
                .write(`_sum?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`;`)
                .newLine();
            writer
                .write(`_min?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`;`)
                .newLine();
            writer
                .write(`_max?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`;`)
                .newLine();
        }
        else {
            writer
                .write(`not?: NestedIntFilter | number`)
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
            .write(`equals: z.number().optional()`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
        writer
            .write(`in: z.union([z.number(), z.number().array()]).optional()`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
        writer
            .write(`notIn: z.union([z.number(), z.number().array()]).optional()`)
            .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
        writer.writeLine(`lt: z.number().optional(),`);
        writer.writeLine(`lte: z.number().optional(),`);
        writer.writeLine(`gt: z.number().optional(),`);
        writer.writeLine(`gte: z.number().optional(),`);
        if (options === null || options === void 0 ? void 0 : options.aggregates) {
            writer
                .write(`not: z.union([z.number(), z.lazy(() => `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableWithAggregatesFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntWithAggregatesFilter`)
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
                .write(`_avg: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_sum: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_min: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_max: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedIntNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedIntFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
        }
        else {
            writer
                .write(`not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional()`)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
                .write(`,`);
        }
    })
        .write(`)`);
};
const getIntFilterBaseStatements = () => {
    return [
        (0, utils_1.writeHeading)(`INT FILTERS`, 'FAT'),
        (0, utils_1.writeHeading)(`INT FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'IntFilter',
            type: filterTypes(),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'IntFilter',
                    type: 'z.ZodType<IntFilter>',
                    initializer: filterInitializer(),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED INT FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedIntFilter',
            type: filterTypes(),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedIntFilter',
                    type: 'z.ZodType<NestedIntFilter>',
                    initializer: filterInitializer(),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`INT WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'IntWithAggregatesFilter',
            type: filterTypes({ aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'IntWithAggregatesFilter',
                    type: 'z.ZodType<IntWithAggregatesFilter>',
                    initializer: filterInitializer({ aggregates: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED INT WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedIntWithAggregatesFilter',
            type: filterTypes({ aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedIntWithAggregatesFilter',
                    type: 'z.ZodType<NestedIntWithAggregatesFilter>',
                    initializer: filterInitializer({ aggregates: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`INT NULLABLE FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'IntNullableFilter',
            type: filterTypes({ nullable: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'IntNullableFilter',
                    type: 'z.ZodType<IntNullableFilter>',
                    initializer: filterInitializer({ nullable: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED NULLABLE INT FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedIntNullableFilter',
            type: filterTypes({ nullable: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedIntNullableFilter',
                    type: 'z.ZodType<NestedIntNullableFilter>',
                    initializer: filterInitializer({ nullable: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'IntNullableWithAggregatesFilter',
            type: filterTypes({ nullable: true, aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'IntNullableWithAggregatesFilter',
                    type: 'z.ZodType<IntNullableWithAggregatesFilter>',
                    initializer: filterInitializer({
                        nullable: true,
                        aggregates: true,
                    }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedIntNullableWithAggregatesFilter',
            type: filterTypes({ nullable: true, aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedIntNullableWithAggregatesFilter',
                    type: 'z.ZodType<NestedIntNullableWithAggregatesFilter>',
                    initializer: filterInitializer({
                        nullable: true,
                        aggregates: true,
                    }),
                },
            ],
        }),
    ].flat();
};
exports.getIntFilterBaseStatements = getIntFilterBaseStatements;
//# sourceMappingURL=getIntFilterBaseStatements.js.map