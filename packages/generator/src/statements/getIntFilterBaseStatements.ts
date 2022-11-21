import { CodeBlockWriter, StructureKind } from 'ts-morph';

import { GetStatements, Statement, WriteBaseTypesFunction } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

export const getIntFilterBaseStatements: GetStatements = () => {
  const intFilterTypes: WriteBaseTypesFunction =
    (options) => (writer: CodeBlockWriter) => {
      writer.inlineBlock(() => {
        writer
          .write(`equals?: number`)
          .conditionalWrite(options?.nullable, ` | null`)
          .write(`;`)
          .newLine();
        writer
          .write(`in?: Prisma.Prisma.Enumerable<number>`)
          .conditionalWrite(options?.nullable, ` | null`)
          .write(`;`)
          .newLine();
        writer
          .write(`notIn?: Prisma.Prisma.Enumerable<number>`)
          .conditionalWrite(options?.nullable, ` | null`)
          .write(`;`)
          .newLine();
        writer.writeLine(`lt?: number;`);
        writer.writeLine(`lte?: number;`);
        writer.writeLine(`gt?: number;`);
        writer.writeLine(`gte?: number;`);

        if (options?.aggregates) {
          writer
            .write(`not?: `)
            .conditionalWrite(
              options?.nullable,
              `NestedIntNullableWithAggregatesFilter`,
            )
            .conditionalWrite(
              !options?.nullable,
              `NestedIntWithAggregatesFilter`,
            )
            .write(` | number`)
            .conditionalWrite(options?.nullable, ` | null`)
            .write(`;`)
            .newLine();
          writer
            .write(`_count?: `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`;`)
            .newLine();
          writer
            .write(`_avg?: `)
            .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
            .write(`;`)
            .newLine();
          writer
            .write(`_sum?: `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`;`)
            .newLine();
          writer
            .write(`_min?: `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`;`)
            .newLine();
          writer
            .write(`_max?: `)
            .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedIntFilter`)
            .write(`;`)
            .newLine();
        } else {
          writer
            .write(`not?: NestedIntFilter | number`)
            .conditionalWrite(options?.nullable, ` | null`)
            .write(`;`)
            .newLine();
        }
      });
    };

  const intFilterInitializer: WriteBaseTypesFunction =
    (options) => (writer) => {
      writer
        .write(`z.object(`)
        .inlineBlock(() => {
          writer
            .write(`equals: z.number().optional()`)
            .conditionalWrite(options?.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
          writer
            .write(`in: z.union([z.number(), z.number().array()]).optional()`)
            .conditionalWrite(options?.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
          writer
            .write(
              `notIn: z.union([z.number(), z.number().array()]).optional()`,
            )
            .conditionalWrite(options?.nullable, `.nullable()`)
            .write(`,`)
            .newLine();
          writer.writeLine(`lt: z.number().optional(),`);
          writer.writeLine(`lte: z.number().optional(),`);
          writer.writeLine(`gt: z.number().optional(),`);
          writer.writeLine(`gte: z.number().optional(),`);

          /// ceck options
          if (options?.aggregates) {
            writer
              .write(`not: z.union([z.number(), z.lazy(() => `)
              .conditionalWrite(
                options?.nullable,
                `NestedIntNullableWithAggregatesFilter`,
              )
              .conditionalWrite(
                !options?.nullable,
                `NestedIntWithAggregatesFilter`,
              )
              .write(`)]).optional()`)
              .conditionalWrite(options?.nullable, `.nullable()`)
              .write(`,`)
              .newLine();

            writer
              .write(`_count: z.lazy(()=> `)
              .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
              .conditionalWrite(!options?.nullable, `NestedIntFilter`)
              .write(`).optional()`)
              .write(`,`)
              .newLine();
            writer
              .write(`_avg: z.lazy(()=> `)
              .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
              .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
              .write(`).optional()`)
              .write(`,`)
              .newLine();
            writer
              .write(`_sum: z.lazy(()=> `)
              .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
              .conditionalWrite(!options?.nullable, `NestedIntFilter`)
              .write(`).optional()`)
              .write(`,`)
              .newLine();
            writer
              .write(`_min: z.lazy(()=> `)
              .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
              .conditionalWrite(!options?.nullable, `NestedIntFilter`)
              .write(`).optional()`)
              .write(`,`)
              .newLine();
            writer
              .write(`_max: z.lazy(()=> `)
              .conditionalWrite(options?.nullable, `NestedIntNullableFilter`)
              .conditionalWrite(!options?.nullable, `NestedIntFilter`)
              .write(`).optional()`)
              .write(`,`)
              .newLine();
          } else {
            writer
              .write(
                `not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional()`,
              )
              .conditionalWrite(options?.nullable, `.nullable()`)
              .write(`,`);
          }
        })
        .write(`)`);
    };

  const intFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'IntFilter',
    type: intFilterTypes(),
  };

  const nestedIntFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'NestedIntFilter',
    type: intFilterTypes(),
  };

  const intWithAggregatesFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'IntWithAggregatesFilter',
    type: intFilterTypes({ aggregates: true }),
  };

  const nestedIntWithAggregatesFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'NestedIntWithAggregatesFilter',
    type: intFilterTypes({ aggregates: true }),
  };

  const intNullableFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'IntNullableFilter',
    type: intFilterTypes({ nullable: true }),
  };

  const nestedIntNullableFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'NestedIntNullableFilter',
    type: intFilterTypes({ nullable: true }),
  };

  const intNullableWithAggregatesFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'IntNullableWithAggregatesFilter',
    type: intFilterTypes({ nullable: true, aggregates: true }),
  };

  const nestedIntNullableWithAggregatesFilterType: Statement = {
    leadingTrivia: (writer) => writer.newLine(),
    kind: StructureKind.TypeAlias,
    name: 'NestedIntNullableWithAggregatesFilter',
    type: intFilterTypes({ nullable: true, aggregates: true }),
  };

  const intFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'IntFilter',
        type: 'z.ZodType<IntFilter>',
        initializer: intFilterInitializer(),
      },
    ],
  });

  const nestedIntFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'NestedIntFilter',
        type: 'z.ZodType<NestedIntFilter>',
        initializer: intFilterInitializer(),
      },
    ],
  });

  const intNullableFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'IntNullableFilter',
        type: 'z.ZodType<IntNullableFilter>',
        initializer: intFilterInitializer({ nullable: true }),
      },
    ],
  });

  const nestedIntNullableFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'NestedIntNullableFilter',
        type: 'z.ZodType<NestedIntNullableFilter>',
        initializer: intFilterInitializer({ nullable: true }),
      },
    ],
  });

  const intWithAggregatesFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'IntWithAggregatesFilter',
        type: 'z.ZodType<IntWithAggregatesFilter>',
        initializer: intFilterInitializer({ aggregates: true }),
      },
    ],
  });

  const nestedIntWithAggregatesFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'NestedIntWithAggregatesFilter',
        type: 'z.ZodType<NestedIntWithAggregatesFilter>',
        initializer: intFilterInitializer({ aggregates: true }),
      },
    ],
  });

  const intNullableWithAggregatesFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'IntNullableWithAggregatesFilter',
        type: 'z.ZodType<IntNullableWithAggregatesFilter>',
        initializer: intFilterInitializer({ nullable: true, aggregates: true }),
      },
    ],
  });

  const nestedIntNullableWithAggregatesFilter = writeConstStatement({
    leadingTrivia: (writer) => writer.newLine(),
    declarations: [
      {
        name: 'NestedIntNullableWithAggregatesFilter',
        type: 'z.ZodType<NestedIntNullableWithAggregatesFilter>',
        initializer: intFilterInitializer({ nullable: true, aggregates: true }),
      },
    ],
  });

  const filterStatements: Statement[] = [
    writeHeading(`INT FILTERS`, 'FAT'),
    writeHeading(`INT FILTER`, 'SLIM'),
    intFilterType,
    intFilter,
    writeHeading(`NESTED INT FILTER`, 'SLIM'),
    nestedIntFilterType,
    nestedIntFilter,
    writeHeading(`INT WITH AGGREGATES FILTER`, 'SLIM'),
    intWithAggregatesFilterType,
    intWithAggregatesFilter,
    writeHeading(`NESTED INT WITH AGGREGATES FILTER`, 'SLIM'),
    nestedIntWithAggregatesFilterType,
    nestedIntWithAggregatesFilter,
    writeHeading(`INT NULLABLE FILTER`, 'SLIM'),
    intNullableFilterType,
    intNullableFilter,
    writeHeading(`NESTED NULLABLE INT FILTER`, 'SLIM'),
    nestedIntNullableFilterType,
    nestedIntNullableFilter,
    writeHeading(`INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    intNullableWithAggregatesFilterType,
    intNullableWithAggregatesFilter,
    writeHeading(`NESTED INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    nestedIntNullableWithAggregatesFilterType,
    nestedIntNullableWithAggregatesFilter,
  ];

  // If an int field exists that is nonNullable, generate the IntFilter types
  //   if (datamodel.baseFilters.Int.standard) {
  //   filterStatements.push(
  //     writeHeading(`INT WITH AGGREGATES FILTER`, 'SLIM'),
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: 'IntWithAggregatesFilter',
  //           type: 'z.ZodType<Prisma.Prisma.IntWithAggregatesFilter>',
  //           initializer(writer) {
  //             writer
  //               .write(`z.object(`)
  //               .inlineBlock(() => {
  //                 writer.writeLine(`equals: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `in: z.union([z.number(), z.number().array()]).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `notIn: z.union([z.number(), z.number().array()]).optional(),`,
  //                 );
  //                 writer.writeLine(`lt: z.number().optional(),`);
  //                 writer.writeLine(`lte: z.number().optional(),`);
  //                 writer.writeLine(`gt: z.number().optional(),`);
  //                 writer.writeLine(`gte: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)]).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_count: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_avg: z.lazy(()=> NestedFloatFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_sum: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_min: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_max: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //               })
  //               .write(`)`);
  //           },
  //         },
  //       ],
  //     }),
  //     writeHeading(`NESTED INT WITH AGGREGATES FILTER`, 'SLIM'),
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: 'NestedIntWithAggregatesFilter',
  //           type: 'z.ZodType<Prisma.Prisma.NestedIntWithAggregatesFilter>',
  //           initializer(writer) {
  //             writer
  //               .write(`z.object(`)
  //               .inlineBlock(() => {
  //                 writer.writeLine(`equals: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `in: z.union([z.number(), z.number().array()]).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `notIn: z.union([z.number(), z.number().array()]).optional(),`,
  //                 );
  //                 writer.writeLine(`lt: z.number().optional(),`);
  //                 writer.writeLine(`lte: z.number().optional(),`);
  //                 writer.writeLine(`gt: z.number().optional(),`);
  //                 writer.writeLine(`gte: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilter)]).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_count: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_avg: z.lazy(()=> NestedFloatFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_sum: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_min: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_max: z.lazy(()=> NestedIntFilter).optional(),`,
  //                 );
  //               })
  //               .write(`)`);
  //           },
  //         },
  //       ],
  //     }),
  //   );
  //   //   }

  //   // If an int field exists that is nullable, generate the IntNullableFilter types
  //   if (datamodel.baseFilters.Int.nullable) {
  //     filterStatements.push(
  //       writeHeading(`INT NULLABLE FILTER`, 'SLIM'),
  //       writeConstStatement({
  //         leadingTrivia: (writer) => writer.newLine(),
  //         declarations: [
  //           {
  //             name: 'IntNullableFilter',
  //             type: 'z.ZodType<Prisma.Prisma.IntNullableFilter>',
  //             initializer(writer) {
  //               writer
  //                 .write(`z.object(`)
  //                 .inlineBlock(() => {
  //                   writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                   writer.writeLine(
  //                     `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(
  //                     `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(`lt: z.number().optional(),`);
  //                   writer.writeLine(`lte: z.number().optional(),`);
  //                   writer.writeLine(`gt: z.number().optional(),`);
  //                   writer.writeLine(`gte: z.number().optional(),`);
  //                   writer.writeLine(
  //                     `not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter)]).optional().nullable(),`,
  //                   );
  //                 })
  //                 .write(`)`);
  //             },
  //           },
  //         ],
  //       }),
  //       writeHeading(`NESTED NULLABLE INT FILTER`, 'SLIM'),
  //       writeConstStatement({
  //         leadingTrivia: (writer) => writer.newLine(),
  //         declarations: [
  //           {
  //             name: 'NestedIntNullableFilter',
  //             type: 'z.ZodType<Prisma.Prisma.NestedIntNullableFilter>',
  //             initializer(writer) {
  //               writer
  //                 .write(`z.object(`)
  //                 .inlineBlock(() => {
  //                   writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                   writer.writeLine(
  //                     `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(
  //                     `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(`lt: z.number().optional(),`);
  //                   writer.writeLine(`lte: z.number().optional(),`);
  //                   writer.writeLine(`gt: z.number().optional(),`);
  //                   writer.writeLine(`gte: z.number().optional(),`);
  //                   writer.writeLine(
  //                     `not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter)]).optional().nullable(),`,
  //                   );
  //                 })
  //                 .write(`)`);
  //             },
  //           },
  //         ],
  //       }),
  //       writeHeading(`INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
  //       writeConstStatement({
  //         leadingTrivia: (writer) => writer.newLine(),
  //         declarations: [
  //           {
  //             name: 'IntNullableWithAggregatesFilter',
  //             type: 'z.ZodType<Prisma.Prisma.IntNullableWithAggregatesFilter>',
  //             initializer(writer) {
  //               writer
  //                 .write(`z.object(`)
  //                 .inlineBlock(() => {
  //                   writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                   writer.writeLine(
  //                     `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(
  //                     `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(`lt: z.number().optional(),`);
  //                   writer.writeLine(`lte: z.number().optional(),`);
  //                   writer.writeLine(`gt: z.number().optional(),`);
  //                   writer.writeLine(`gte: z.number().optional(),`);
  //                   writer.writeLine(
  //                     `not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_count: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_avg: z.lazy(()=> NestedFloatNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_sum: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_min: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_max: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                 })
  //                 .write(`)`);
  //             },
  //           },
  //         ],
  //       }),
  //       writeHeading(`NESTED INT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
  //       writeConstStatement({
  //         leadingTrivia: (writer) => writer.newLine(),
  //         declarations: [
  //           {
  //             name: 'NestedIntNullableWithAggregatesFilter',
  //             type: 'z.ZodType<Prisma.Prisma.NestedIntNullableWithAggregatesFilter>',
  //             initializer(writer) {
  //               writer
  //                 .write(`z.object(`)
  //                 .inlineBlock(() => {
  //                   writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                   writer.writeLine(
  //                     `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(
  //                     `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(`lt: z.number().optional(),`);
  //                   writer.writeLine(`lte: z.number().optional(),`);
  //                   writer.writeLine(`gt: z.number().optional(),`);
  //                   writer.writeLine(`gte: z.number().optional(),`);
  //                   writer.writeLine(
  //                     `not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_count: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_avg: z.lazy(()=> NestedFloatNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_sum: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_min: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                   writer.writeLine(
  //                     `_max: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                   );
  //                 })
  //                 .write(`)`);
  //             },
  //           },
  //         ],
  //       }),
  //     );
  //   }

  return filterStatements.flat();
};
