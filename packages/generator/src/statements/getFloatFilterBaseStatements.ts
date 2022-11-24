import { CodeBlockWriter, StructureKind } from 'ts-morph';

import {
  GetStatements,
  Statement,
  WriteBaseFilterTypesFunction,
} from '../types';
import { writeConstStatement, writeHeading } from '../utils';

///////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////

const filterTypes: WriteBaseFilterTypesFunction =
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
            `NestedFloatNullableWithAggregatesFilter`,
          )
          .conditionalWrite(
            !options?.nullable,
            `NestedFloatWithAggregatesFilter`,
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
          .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
          .write(`;`)
          .newLine();
        writer
          .write(`_min?: `)
          .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
          .write(`;`)
          .newLine();
        writer
          .write(`_max?: `)
          .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
          .write(`;`)
          .newLine();
      } else {
        writer
          .write(`not?: NestedFloatFilter | number`)
          .conditionalWrite(options?.nullable, ` | null`)
          .write(`;`)
          .newLine();
      }
    });
  };

const filterInitializer: WriteBaseFilterTypesFunction =
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
          .write(`notIn: z.union([z.number(), z.number().array()]).optional()`)
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
              `NestedFloatNullableWithAggregatesFilter`,
            )
            .conditionalWrite(
              !options?.nullable,
              `NestedFloatWithAggregatesFilter`,
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
            .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
          writer
            .write(`_min: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
          writer
            .write(`_max: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedFloatNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedFloatFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
        } else {
          writer
            .write(
              `not: z.union([z.number(), z.lazy(() => NestedFloatFilter)]).optional()`,
            )
            .conditionalWrite(options?.nullable, `.nullable()`)
            .write(`,`);
        }
      })
      .write(`)`);
  };

///////////////////////////////////////////
// STATEMENTS
///////////////////////////////////////////

export const getFloatFilterBaseStatements: GetStatements = () => {
  return [
    writeHeading(`FLOAT FILTERS`, 'FAT'),
    writeHeading(`FLOAT FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'FloatFilter',
      type: filterTypes(),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'FloatFilter',
          type: 'z.ZodType<FloatFilter>',
          initializer: filterInitializer(),
        },
      ],
    }),
    writeHeading(`NESTED FLOAT FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedFloatFilter',
      type: filterTypes(),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedFloatFilter',
          type: 'z.ZodType<NestedFloatFilter>',
          initializer: filterInitializer(),
        },
      ],
    }),
    writeHeading(`FLOAT WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'FloatWithAggregatesFilter',
      type: filterTypes({ aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'FloatWithAggregatesFilter',
          type: 'z.ZodType<FloatWithAggregatesFilter>',
          initializer: filterInitializer({ aggregates: true }),
        },
      ],
    }),
    writeHeading(`NESTED FLOAT WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedFloatWithAggregatesFilter',
      type: filterTypes({ aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedFloatWithAggregatesFilter',
          type: 'z.ZodType<NestedFloatWithAggregatesFilter>',
          initializer: filterInitializer({ aggregates: true }),
        },
      ],
    }),
    writeHeading(`FLOAT NULLABLE FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'FloatNullableFilter',
      type: filterTypes({ nullable: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'FloatNullableFilter',
          type: 'z.ZodType<FloatNullableFilter>',
          initializer: filterInitializer({ nullable: true }),
        },
      ],
    }),
    writeHeading(`NESTED NULLABLE FLOAT FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedFloatNullableFilter',
      type: filterTypes({ nullable: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedFloatNullableFilter',
          type: 'z.ZodType<NestedFloatNullableFilter>',
          initializer: filterInitializer({ nullable: true }),
        },
      ],
    }),
    writeHeading(`FLOAT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'FloatNullableWithAggregatesFilter',
      type: filterTypes({ nullable: true, aggregates: true }),
    } as Statement,
    writeConstStatement({
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
    writeHeading(`NESTED FLOAT NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedFloatNullableWithAggregatesFilter',
      type: filterTypes({ nullable: true, aggregates: true }),
    } as Statement,
    writeConstStatement({
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
