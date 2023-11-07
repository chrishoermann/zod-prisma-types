import { WriteFieldOptions } from '../../types';

export const writeJson = ({ writer, field }: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: JsonValueSchema`)
    .conditionalWrite(field.isList, `.array()`)
    .conditionalWrite(!field.isNullable, `.nullable()`) // needs to be nullable instead of optional to adhere to the type returned by Prisma
    .write(`,`)
    .newLine();
};
