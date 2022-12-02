"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFloatFilterBaseStatements = void 0;
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
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableWithAggregatesFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatWithAggregatesFilter`)
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
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`;`)
                .newLine();
            writer
                .write(`_min?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`;`)
                .newLine();
            writer
                .write(`_max?: `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`;`)
                .newLine();
        }
        else {
            writer
                .write(`not?: NestedFloatFilter | number`)
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
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableWithAggregatesFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatWithAggregatesFilter`)
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
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_min: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
            writer
                .write(`_max: z.lazy(()=> `)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `NestedFloatNullableFilter`)
                .conditionalWrite(!(options === null || options === void 0 ? void 0 : options.nullable), `NestedFloatFilter`)
                .write(`).optional()`)
                .write(`,`)
                .newLine();
        }
        else {
            writer
                .write(`not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional()`)
                .conditionalWrite(options === null || options === void 0 ? void 0 : options.nullable, `.nullable()`)
                .write(`,`);
        }
    })
        .write(`)`);
};
const getFloatFilterBaseStatements = () => {
    return [
        (0, utils_1.writeHeading)(`FLOAT FILTERS`, 'FAT'),
        (0, utils_1.writeHeading)(`FLOAT FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'FloatFilter',
            type: filterTypes(),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'FloatFilter',
                    type: 'z.ZodType<FloatFilter>',
                    initializer: filterInitializer(),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED FLOAT FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedFloatFilter',
            type: filterTypes(),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedFloatFilter',
                    type: 'z.ZodType<NestedFloatFilter>',
                    initializer: filterInitializer(),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`FLOAT WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'FloatWithAggregatesFilter',
            type: filterTypes({ aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'FloatWithAggregatesFilter',
                    type: 'z.ZodType<FloatWithAggregatesFilter>',
                    initializer: filterInitializer({ aggregates: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED FLOAT WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedFloatWithAggregatesFilter',
            type: filterTypes({ aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedFloatWithAggregatesFilter',
                    type: 'z.ZodType<NestedFloatWithAggregatesFilter>',
                    initializer: filterInitializer({ aggregates: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`FLOAT NULLABLE FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'FloatNullableFilter',
            type: filterTypes({ nullable: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'FloatNullableFilter',
                    type: 'z.ZodType<FloatNullableFilter>',
                    initializer: filterInitializer({ nullable: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED NULLABLE FLOAT FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedFloatNullableFilter',
            type: filterTypes({ nullable: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedFloatNullableFilter',
                    type: 'z.ZodType<NestedFloatNullableFilter>',
                    initializer: filterInitializer({ nullable: true }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`FLOAT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'FloatNullableWithAggregatesFilter',
            type: filterTypes({ nullable: true, aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'FloatNullableWithAggregatesFilter',
                    type: 'z.ZodType<FloatNullableWithAggregatesFilter>',
                    initializer: filterInitializer({
                        nullable: true,
                        aggregates: true,
                    }),
                },
            ],
        }),
        (0, utils_1.writeHeading)(`NESTED FLOAT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
        {
            leadingTrivia: (writer) => writer.newLine(),
            kind: ts_morph_1.StructureKind.TypeAlias,
            name: 'NestedFloatNullableWithAggregatesFilter',
            type: filterTypes({ nullable: true, aggregates: true }),
        },
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'NestedFloatNullableWithAggregatesFilter',
                    type: 'z.ZodType<NestedFloatNullableWithAggregatesFilter>',
                    initializer: filterInitializer({
                        nullable: true,
                        aggregates: true,
                    }),
                },
            ],
        }),
    ].flat();
};
exports.getFloatFilterBaseStatements = getFloatFilterBaseStatements;
//# sourceMappingURL=getFloatFilterBaseStatements.js.map