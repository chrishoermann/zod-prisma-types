/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { ENUM_IMPORT_STATEMENT } from '../constants';
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';
import { getFloatFilterBaseStatements } from './getFloatFilterBaseStatements';
import { getIntFilterBaseStatements } from './getIntFilterBaseStatements';
import { getStringFilterBaseStatements } from './getStringFilterBaseStatements';

// Why are base typescript types generated when they already exist in prisma client?
//
// - in prisma client the types are generated dynamically based on the occurence of the type in any field of the schema
//   e.g. `FloatFilter` is generated if there is a field of type `Float`, but not if there is a field of type `Float?`
//   then the type `FloatNullableFilter` is generated instead and so on.
//
// - all types with aggregates use e.g. `IntFilter` as a type so it seems that "IntFilter" needs to be generated always
//
// - maybe some other mixture of types can occure that I'm not awere of

// TODO: automate the generation based on the prisma client types
// - string: [+nestedIntFilter]
// - int: [+nestedFloatFilter]

export const getFilterBaseStatements: GetStatements = (dmmf) => {
  // ENUM FILTER
  //------------------------------------------------------

  const enumFilter = [
    writeHeading(`ENUMS`, 'FAT'),
    writeHeading(`SORT ORDER`, 'SLIM'),
    writeConstStatement({
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
    writeHeading(`QUERY MODE`, 'SLIM'),
    writeConstStatement({
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

  // BOOL FILTER
  //------------------------------------------------------

  const boolFilter: Statement[] = [];

  boolFilter.push(
    writeHeading(`BOOL FILTERS`, 'FAT'),
    writeHeading(`BOOL FILTER`, 'SLIM'),
    writeConstStatement({
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
                writer.writeLine(
                  `not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
    writeHeading(`NESTED BOOL FILTER`, 'SLIM'),
    writeConstStatement({
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
                writer.writeLine(
                  `not: z.union([z.boolean(), z.lazy(() => NestedBoolFilter)]).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
  );

  boolFilter.push(
    writeHeading(`NESTED BOOL WITH AGGREGATES FILTER`, 'SLIM'),
    writeConstStatement({
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
                writer.writeLine(
                  `not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilter)]).optional(),`,
                );
                writer.writeLine(
                  `_count: z.lazy(()=> NestedIntFilter).optional(),`,
                );
                writer.writeLine(
                  `_min: z.lazy(()=> NestedBoolFilter).optional(),`,
                );
                writer.writeLine(
                  `_max: z.lazy(()=> NestedBoolFilter).optional(),`,
                );
              })
              .write(`)`);
          },
        },
      ],
    }),
  );

  // STRING FILTER
  //------------------------------------------------------

  const stringFilter: Statement[] = getStringFilterBaseStatements(dmmf);

  // INT FILTER
  //------------------------------------------------------

  const intFilter: Statement[] = getIntFilterBaseStatements(dmmf);

  // FLOAT FILTER
  //------------------------------------------------------

  const floatFilter: Statement[] = getFloatFilterBaseStatements(dmmf);

  return [
    ...enumFilter,
    ...boolFilter,
    ...stringFilter,
    ...intFilter,
    ...floatFilter,
  ].flat();
};
