import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

export const getFloatFilterBaseStatements: GetStatements = (datamodel) => {
  const filterStatements: Statement[] = [writeHeading(`FLOAT FILTERS`, 'FAT')];

  // NestedFloatFilter type is generated when int filters are generated
  // because it is used in  int aggregates filter _avg property
  if (
    datamodel.baseFilters.Float.standard ||
    datamodel.baseFilters.Int.standard ||
    datamodel.baseFilters.Int.nullable
  ) {
    filterStatements.push(
      writeHeading(`NESTED FLOAT FILTER`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: 'NestedIntFilter',
            type: 'z.ZodType<Prisma.Prisma.NestedIntFilter>',
            initializer(writer) {
              writer
                .write(`z.object(`)
                .inlineBlock(() => {
                  writer.writeLine(`equals: z.number().optional(),`);
                  writer.writeLine(
                    `in: z.union([z.number(), z.number().array()]).optional(),`,
                  );
                  writer.writeLine(
                    `notIn: z.union([z.number(), z.number().array()]).optional(),`,
                  );
                  writer.writeLine(`lt: z.number().optional(),`);
                  writer.writeLine(`lte: z.number().optional(),`);
                  writer.writeLine(`gt: z.number().optional(),`);
                  writer.writeLine(`gte: z.number().optional(),`);
                  writer.writeLine(
                    `not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),`,
                  );
                })
                .write(`)`);
            },
          },
        ],
      }),
    );
  }

  // If an int field exists that is nonNullable, generate the IntFilter types
  // if (datamodel.baseFilters.Int.standard) {
  //   filterStatements.push(
  //     writeHeading(`FLOAT FILTER`, 'SLIM'),
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: 'IntFilter',
  //           type: 'z.ZodType<Prisma.Prisma.IntFilter>',
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
  //                   `not: z.union([z.number(), z.lazy(() => NestedIntFilter)]).optional(),`,
  //                 );
  //               })
  //               .write(`)`);
  //           },
  //         },
  //       ],
  //     }),
  //     writeHeading(`FLOAT WITH AGGREGATES FILTER`, 'SLIM'),
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
  //     writeHeading(`NESTED FLOAT WITH AGGREGATES FILTER`, 'SLIM'),
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
  // }

  // // If an int field exists that is nullable, generate the IntNullableFilter types
  // if (datamodel.baseFilters.Int.nullable) {
  //   filterStatements.push(
  //     writeHeading(`FLOAT NULLABLE FILTER`, 'SLIM'),
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: 'IntNullableFilter',
  //           type: 'z.ZodType<Prisma.Prisma.IntNullableFilter>',
  //           initializer(writer) {
  //             writer
  //               .write(`z.object(`)
  //               .inlineBlock(() => {
  //                 writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                 writer.writeLine(
  //                   `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(
  //                   `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(`lt: z.number().optional(),`);
  //                 writer.writeLine(`lte: z.number().optional(),`);
  //                 writer.writeLine(`gt: z.number().optional(),`);
  //                 writer.writeLine(`gte: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter)]).optional().nullable(),`,
  //                 );
  //               })
  //               .write(`)`);
  //           },
  //         },
  //       ],
  //     }),
  //     writeHeading(`NESTED NULLABLE FLOAT FILTER`, 'SLIM'),
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: 'NestedIntNullableFilter',
  //           type: 'z.ZodType<Prisma.Prisma.NestedIntNullableFilter>',
  //           initializer(writer) {
  //             writer
  //               .write(`z.object(`)
  //               .inlineBlock(() => {
  //                 writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                 writer.writeLine(
  //                   `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(
  //                   `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(`lt: z.number().optional(),`);
  //                 writer.writeLine(`lte: z.number().optional(),`);
  //                 writer.writeLine(`gt: z.number().optional(),`);
  //                 writer.writeLine(`gte: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `not: z.union([z.number(), z.lazy(() => NestedIntNullableFilter)]).optional().nullable(),`,
  //                 );
  //               })
  //               .write(`)`);
  //           },
  //         },
  //       ],
  //     }),
  //     writeHeading(`FLOAT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: 'IntNullableWithAggregatesFilter',
  //           type: 'z.ZodType<Prisma.Prisma.IntNullableWithAggregatesFilter>',
  //           initializer(writer) {
  //             writer
  //               .write(`z.object(`)
  //               .inlineBlock(() => {
  //                 writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                 writer.writeLine(
  //                   `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(
  //                   `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(`lt: z.number().optional(),`);
  //                 writer.writeLine(`lte: z.number().optional(),`);
  //                 writer.writeLine(`gt: z.number().optional(),`);
  //                 writer.writeLine(`gte: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_count: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_avg: z.lazy(()=> NestedFloatNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_sum: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_min: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_max: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //               })
  //               .write(`)`);
  //           },
  //         },
  //       ],
  //     }),
  //     writeHeading(`NESTED FLOAT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: 'NestedIntNullableWithAggregatesFilter',
  //           type: 'z.ZodType<Prisma.Prisma.NestedIntNullableWithAggregatesFilter>',
  //           initializer(writer) {
  //             writer
  //               .write(`z.object(`)
  //               .inlineBlock(() => {
  //                 writer.writeLine(`equals: z.number().optional().nullable(),`);
  //                 writer.writeLine(
  //                   `in: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(
  //                   `notIn: z.union([z.number(), z.number().array()]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(`lt: z.number().optional(),`);
  //                 writer.writeLine(`lte: z.number().optional(),`);
  //                 writer.writeLine(`gt: z.number().optional(),`);
  //                 writer.writeLine(`gte: z.number().optional(),`);
  //                 writer.writeLine(
  //                   `not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilter)]).optional().nullable(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_count: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_avg: z.lazy(()=> NestedFloatNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_sum: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_min: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //                 writer.writeLine(
  //                   `_max: z.lazy(()=> NestedIntNullableFilter).optional(),`,
  //                 );
  //               })
  //               .write(`)`);
  //           },
  //         },
  //       ],
  //     }),
  //   );
  // }

  return filterStatements.flat();
};
