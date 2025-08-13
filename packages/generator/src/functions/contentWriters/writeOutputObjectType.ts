import { writeNonScalarType, writeScalarType, writeSpecialType } from '..';
import {
  ExtendedDMMFSchemaField,
  writeImportStatementOptions,
} from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeSelect } from './writeSelect';

export const writeOutputObjectType = (
  { fileWriter, dmmf, getSingleFileContent = false }: ContentWriterOptions,
  field: ExtendedDMMFSchemaField,
) => {
  const { writer, writeImports, writeHeading } = fileWriter;
  const {
    useMultipleFiles,
    useExactOptionalPropertyTypes,
    useTypeAssertions,
    inputTypePath,
  } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    const imports: writeImportStatementOptions[] = [];
    if (useExactOptionalPropertyTypes) {
      imports.push({
        name: 'ru',
        path: `../${inputTypePath}/RemoveUndefined`,
        isDefault: true,
      });
    }
    imports.push(...field.argTypeImports);

    writeImports(imports);

    // determine if the outputType should include the "select" or "include" field
    const modelWithSelect = dmmf.schema.getModelWithIncludeAndSelect(field);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // ONLY FOR MULTI FILE IMPORTS!
    // The select schema needs to be in the same file as
    // the model's args schema to prevent circular imports.
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (modelWithSelect && field.generatorConfig.addSelectType) {
      // if the outputType has a "select" or "include" field,
      // the schemas that are used in the type of the field
      // need to be imported

      // temporary workaround to prevent importing the generated schema when
      // there is a self reference in the model
      const filterdImports = [
        ...modelWithSelect.includeImports,
        ...modelWithSelect.selectImports,
      ].filter(
        (imp) => !(field.argName && imp.path.includes(`/${field.argName}`)),
      );

      writeImports(filterdImports);

      // Only write the select type if the outputType has a "select" or "include" field.
      // Some outputTypes like "CreateMany", "UpdateMany", "DeleteMany"
      // do not have a "select" or "include" field.

      if (field.writeSelectAndIncludeArgs) {
        writeHeading(
          'Select schema needs to be in file to prevent circular imports',
        );

        writeSelect(
          { fileWriter, dmmf, getSingleFileContent: true },
          modelWithSelect,
        );
      }
    }
  }

  writer
    .blankLine()
    .write(`export const ${field.argName}Schema: `)
    .write(field.customArgType)
    .write(` = `)
    .write(`z.object(`)
    .inlineBlock(() => {
      const modelType =
        typeof field.modelType === 'string'
          ? field.modelType
          : field.modelType.name;
      writer
        .conditionalWriteLine(
          field.writeSelectArg,
          `select: ${modelType}SelectSchema.optional(),`,
        )
        .conditionalWriteLine(
          field.writeIncludeArg && !useMultipleFiles,
          `include: ${modelType}IncludeSchema.optional(),`,
        )
        .conditionalWriteLine(
          field.writeIncludeArg && useMultipleFiles,
          `include: z.lazy(() => ${modelType}IncludeSchema).optional(),`,
        );
      field.args.forEach((arg) => {
        writer.write(`${arg.name}: `);

        const { isOptional, isNullable } = arg;

        if (arg.hasMultipleTypes) {
          writer.write(`z.union([ `);

          arg.inputTypes.forEach((inputType, idx) => {
            const writeComma = idx !== arg.inputTypes.length - 1;

            writeScalarType(writer, {
              inputType,
              writeLazy: false,
              writeComma,
            });
            writeNonScalarType(writer, {
              inputType,
              writeLazy: false,
              writeComma,
            });
            writeSpecialType(writer, {
              inputType,
              writeLazy: false,
              writeComma,
            });
          });

          writer
            .write(` ])`)
            .conditionalWrite(arg.isOptional, `.optional()`)
            .conditionalWrite(arg.isNullable, `.nullable()`)
            .write(`,`);
        } else {
          writeScalarType(writer, {
            inputType: arg.inputTypes[0],
            writeLazy: false,
            isNullable,
            isOptional,
          });
          writeNonScalarType(writer, {
            inputType: arg.inputTypes[0],
            writeLazy: false,
            isNullable,
            isOptional,
          });
          writeSpecialType(writer, {
            inputType: arg.inputTypes[0],
            writeLazy: false,
            isNullable,
            isOptional,
          });
        }

        writer.newLine();
      });
    })
    .write(`)`)
    .write(`.strict()`)
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    .conditionalWrite(useTypeAssertions, `as ${field.customArgType};`)
    .conditionalWrite(!useTypeAssertions, `;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${field.argName}Schema;`);
  }
};
