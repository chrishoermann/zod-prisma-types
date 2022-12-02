"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterBaseStatements = void 0;
const utils_1 = require("../utils");
const getFloatFilterBaseStatements_1 = require("./getFloatFilterBaseStatements");
const getIntFilterBaseStatements_1 = require("./getIntFilterBaseStatements");
const getStringFilterBaseStatements_1 = require("./getStringFilterBaseStatements");
const getFilterBaseStatements = (dmmf) => {
    const enumFilter = [
        (0, utils_1.writeHeading)(`ENUMS`, 'FAT'),
        (0, utils_1.writeHeading)(`SORT ORDER`, 'SLIM'),
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'SortOrder',
                    initializer(writer) {
                        writer.write(`z.nativeEnum(Prisma.Prisma.SortOrder)`);
                    },
                },
            ],
        }),
        (0, utils_1.writeHeading)(`QUERY MODE`, 'SLIM'),
        (0, utils_1.writeConstStatement)({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
                {
                    name: 'QueryMode',
                    initializer(writer) {
                        writer.write(`z.nativeEnum(Prisma.Prisma.QueryMode)`);
                    },
                },
            ],
        }),
    ];
    const boolFilter = [];
    boolFilter.push((0, utils_1.writeHeading)(`BOOL FILTERS`, 'FAT'), (0, utils_1.writeHeading)(`BOOL FILTER`, 'SLIM'), (0, utils_1.writeConstStatement)({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
            {
                name: 'BoolFilter',
                type: 'z.ZodType<Prisma.Prisma.BoolFilter>',
                initializer(writer) {
                    writer
                        .write(`z.object(`)
                        .inlineBlock(() => {
                        writer.writeLine(`equals: z.boolean().optional(),`);
                        writer.writeLine(`not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),`);
                    })
                        .write(`)`);
                },
            },
        ],
    }), (0, utils_1.writeHeading)(`NESTED BOOL FILTER`, 'SLIM'), (0, utils_1.writeConstStatement)({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
            {
                name: 'NestedBoolFilter',
                type: 'z.ZodType<Prisma.Prisma.NestedBoolFilter>',
                initializer(writer) {
                    writer
                        .write(`z.object(`)
                        .inlineBlock(() => {
                        writer.writeLine(`equals: z.boolean().optional(),`);
                        writer.writeLine(`not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),`);
                    })
                        .write(`)`);
                },
            },
        ],
    }));
    boolFilter.push((0, utils_1.writeHeading)(`NESTED BOOL WITH AGGREGATES FILTER`, 'SLIM'), (0, utils_1.writeConstStatement)({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
            {
                name: 'NestedBoolWithAggregatesFilter',
                type: 'z.ZodType<Prisma.Prisma.NestedBoolWithAggregatesFilter>',
                initializer(writer) {
                    writer
                        .write(`z.object(`)
                        .inlineBlock(() => {
                        writer.writeLine(`equals: z.boolean().optional(),`);
                        writer.writeLine(`not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilter)]).optional(),`);
                        writer.writeLine(`_count: z.lazy(()=> NestedIntFilter).optional(),`);
                        writer.writeLine(`_min: z.lazy(()=> NestedBoolFilter).optional(),`);
                        writer.writeLine(`_max: z.lazy(()=> NestedBoolFilter).optional(),`);
                    })
                        .write(`)`);
                },
            },
        ],
    }));
    const stringFilter = (0, getStringFilterBaseStatements_1.getStringFilterBaseStatements)(dmmf);
    const intFilter = (0, getIntFilterBaseStatements_1.getIntFilterBaseStatements)(dmmf);
    const floatFilter = (0, getFloatFilterBaseStatements_1.getFloatFilterBaseStatements)(dmmf);
    return [
        ...enumFilter,
        ...boolFilter,
        ...stringFilter,
        ...intFilter,
        ...floatFilter,
    ].flat();
};
exports.getFilterBaseStatements = getFilterBaseStatements;
//# sourceMappingURL=getFilterBaseStatements.js.map