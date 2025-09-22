import { ExtendedDMMFOutputType } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '../zodCompatibility';
import { globalConfig } from '../../config';

export const writeSelect = (
  {
    fileWriter: { writer, writeImport, writeImportSet },
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
) => {
  const {
    useMultipleFiles,
    useExactOptionalPropertyTypes,
    prismaClientPath,
    inputTypePath,
  } = globalConfig.getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
    writeImport('type { Prisma }', prismaClientPath);
    if (useExactOptionalPropertyTypes) {
      writeImport('ru', `../${inputTypePath}/RemoveUndefined`);
    }
    writeImportSet(model.selectImports);
  }

  writer
    .blankLine()
    .write(`export const ${model.name}SelectSchema: `)
    .write(`z.ZodType<Prisma.${model.name}Select> = `)
    .write(`z.object(`)
    .inlineBlock(() => {
      model.fields.forEach((field) => {
        if (field.isEnumOutputType()) {
          return writer
            .write(`${field.name}: `)
            .write(`z.boolean()`)
            .write(`.optional(),`)
            .newLine();
        }

        // when using mongodb, there is no `findMany` arg type created even for lists
        // so the basic arg type needs to be used instead

        if (field.writeSelectFindManyField) {
          return writer
            .write(`${field.name}: `)
            .write(`z.union([`)
            .write(`z.boolean(),`)
            .write(`z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`)
            .write(`])`)
            .write(`.optional()`)
            .write(`,`)
            .newLine();
        }

        if (field.writeSelectField) {
          return writer
            .write(`${field.name}: `)
            .write(`z.union([`)
            .write(`z.boolean(),`)
            .write(`z.lazy(() => ${field.outputType.type}ArgsSchema)`)
            .write(`])`)
            .write(`.optional()`)
            .write(`,`)
            .newLine();
        }

        return writer
          .write(`${field.name}: `)
          .write(`z.boolean()`)
          .write(`.optional(),`)
          .newLine();
      });
    });

  writer
    .write(`)`)
    .write(`.strict()`)
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    // .write(' as z.ZodType<Prisma.')
    // .write(`${model.name}Select>`)
    .newLine();

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}SelectSchema;`);
  }
};
