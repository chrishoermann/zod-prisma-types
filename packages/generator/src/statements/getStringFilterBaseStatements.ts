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
        .write(`equals?: string`)
        .conditionalWrite(options?.nullable, ` | null`)
        .write(`;`)
        .newLine();
      writer
        .write(`in?: Prisma.Prisma.Enumerable<string>`)
        .conditionalWrite(options?.nullable, ` | null`)
        .write(`;`)
        .newLine();
      writer
        .write(`notIn?: Prisma.Prisma.Enumerable<string>`)
        .conditionalWrite(options?.nullable, ` | null`)
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

      if (options?.aggregates) {
        writer
          .write(`not?: `)
          .conditionalWrite(
            options?.nullable,
            `NestedStringNullableWithAggregatesFilter`,
          )
          .conditionalWrite(
            !options?.nullable,
            `NestedStringWithAggregatesFilter`,
          )
          .write(` | string`)
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
          .write(`_min?: `)
          .conditionalWrite(options?.nullable, `NestedStringNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedStringFilter`)
          .write(`;`)
          .newLine();
        writer
          .write(`_max?: `)
          .conditionalWrite(options?.nullable, `NestedStringNullableFilter`)
          .conditionalWrite(!options?.nullable, `NestedStringFilter`)
          .write(`;`)
          .newLine();
      } else {
        writer
          .write(`not?: NestedStringFilter | string`)
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
          .write(`equals: z.string().optional()`)
          .conditionalWrite(options?.nullable, `.nullable()`)
          .write(`,`)
          .newLine();
        writer
          .write(`in: z.union([z.string(), z.string().array()]).optional()`)
          .conditionalWrite(options?.nullable, `.nullable()`)
          .write(`,`)
          .newLine();
        writer
          .write(`notIn: z.union([z.string(), z.string().array()]).optional()`)
          .conditionalWrite(options?.nullable, `.nullable()`)
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

        /// ceck options
        if (options?.aggregates) {
          writer
            .write(`not: z.union([z.string(), z.lazy(() => `)
            .conditionalWrite(
              options?.nullable,
              `NestedStringNullableWithAggregatesFilter`,
            )
            .conditionalWrite(
              !options?.nullable,
              `NestedStringWithAggregatesFilter`,
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
            .write(`_min: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedStringNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedStringFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
          writer
            .write(`_max: z.lazy(()=> `)
            .conditionalWrite(options?.nullable, `NestedStringNullableFilter`)
            .conditionalWrite(!options?.nullable, `NestedStringFilter`)
            .write(`).optional()`)
            .write(`,`)
            .newLine();
        } else {
          writer
            .write(
              `not: z.union([z.string(), z.lazy(() => NestedStringFilter)]).optional()`,
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

export const getStringFilterBaseStatements: GetStatements = () => {
  return [
    writeHeading(`STRING FILTERS`, 'FAT'),
    writeHeading(`STRING FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'StringFilter',
      type: filterTypes(),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'StringFilter',
          type: 'z.ZodType<StringFilter>',
          initializer: filterInitializer(),
        },
      ],
    }),
    writeHeading(`NESTED STRING FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedStringFilter',
      type: filterTypes(),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedStringFilter',
          type: 'z.ZodType<NestedStringFilter>',
          initializer: filterInitializer(),
        },
      ],
    }),
    writeHeading(`STRING WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'StringWithAggregatesFilter',
      type: filterTypes({ aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'StringWithAggregatesFilter',
          type: 'z.ZodType<StringWithAggregatesFilter>',
          initializer: filterInitializer({ aggregates: true }),
        },
      ],
    }),
    writeHeading(`NESTED STRING WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedStringWithAggregatesFilter',
      type: filterTypes({ aggregates: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedStringWithAggregatesFilter',
          type: 'z.ZodType<NestedStringWithAggregatesFilter>',
          initializer: filterInitializer({ aggregates: true }),
        },
      ],
    }),
    writeHeading(`STRING NULLABLE FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'StringNullableFilter',
      type: filterTypes({ nullable: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'StringNullableFilter',
          type: 'z.ZodType<StringNullableFilter>',
          initializer: filterInitializer({ nullable: true }),
        },
      ],
    }),
    writeHeading(`NESTED NULLABLE STRING FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedStringNullableFilter',
      type: filterTypes({ nullable: true }),
    } as Statement,
    writeConstStatement({
      leadingTrivia: (writer) => writer.newLine(),
      declarations: [
        {
          name: 'NestedStringNullableFilter',
          type: 'z.ZodType<NestedStringNullableFilter>',
          initializer: filterInitializer({ nullable: true }),
        },
      ],
    }),
    writeHeading(`STRING NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'StringNullableWithAggregatesFilter',
      type: filterTypes({ nullable: true, aggregates: true }),
    } as Statement,
    writeConstStatement({
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
    writeHeading(`NESTED STRING NULLABLE WITH AGGREGATES FILTER`, 'SLIM'),
    {
      leadingTrivia: (writer) => writer.newLine(),
      kind: StructureKind.TypeAlias,
      name: 'NestedStringNullableWithAggregatesFilter',
      type: filterTypes({ nullable: true, aggregates: true }),
    } as Statement,
    writeConstStatement({
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
