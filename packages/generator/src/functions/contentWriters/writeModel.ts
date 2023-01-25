import { writeModelFields } from '../../utils';
import { ExtendedDMMFModel } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeRelation } from '../fieldWriters';

export const writeModel = (
  {
    fileWriter: { writer, writeImport, writeImportSet, writeJSDoc },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFModel,
) => {
  const { useMultipleFiles, prismaClientPath, createRelationValuesTypes } =
    dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImportSet(model.imports);

    if (createRelationValuesTypes) {
      writeImportSet(
        new Set(
          model.relationFields
            .map((field) => [
              `import { ${field.type}WithRelationsSchema } from './${field.type}Schema'`,
              `import { type ${field.type} } from '${prismaClientPath}'`,
            ])
            .flat(),
        ),
      );
    }
  }

  writer.blankLine();

  writeJSDoc(model.clearedDocumentation);

  writer
    .write(`export const ${model.name}Schema = z.object(`)
    .inlineBlock(() => {
      [...model.enumFields, ...model.scalarFields].forEach((field) => {
        writeModelFields({
          writer,
          field,
          model,
          dmmf,
        });
      });
    })
    .write(`)`);

  if (model.writeOptionalDefaultValuesTypes()) {
    writer
      .blankLine()
      .write(`export const ${model.name}OptionalDefaultsSchema =`)
      .write(`${model.name}Schema.merge(z.object(`)
      .inlineBlock(() => {
        [...model.enumFields, ...model.scalarFields].forEach((field) => {
          if (!field.isOptionalDefaultField()) return;

          const writeOptions = {
            writer,
            field,
            writeOptionalDefaults: true,
          };

          writeModelFields({
            ...writeOptions,
            model,
            dmmf,
          });
        });
      })
      .write(`))`);
  }

  if (createRelationValuesTypes) {
    // write Type for relations

    writer
      .blankLine()
      .write(`export type ${model.name}WithRelations = `)
      .inlineBlock(() => {
        model.scalarFields.forEach((field) => {
          writer.writeLine(
            `${field.name}${!field.isRequired ? '?' : ''}: ${field.zodType}${
              field.isList ? '[]' : ''
            }${!field.isRequired ? ' | null' : ''};`,
          );
        });

        model.enumFields.forEach((field) => {
          writer.writeLine(
            `${field.name}${!field.isRequired ? '?' : ''}: z.infer<typeof ${
              field.type
            }Schema>${field.isList ? '[]' : ''}${
              !field.isRequired ? ' | null' : ''
            };`,
          );
        });

        model.relationFields.forEach((field) => {
          writer.writeLine(
            `${field.name}${!field.isRequired ? '?' : ''}: z.infer<typeof ${
              field.type
            }WithRelationsSchema>${field.isList ? '[]' : ''}${
              !field.isRequired ? ' | null' : ''
            };`,
          );
        });
      });

    writer
      .blankLine()
      .write(
        `export const ${model.name}WithRelationsSchema: z.ZodType<${model.name}WithRelations> = z.object(`,
      )
      .inlineBlock(() => {
        [...model.enumFields, ...model.scalarFields].forEach((field) => {
          writeModelFields({
            writer,
            field,
            model,
            dmmf,
          });
        });

        if (createRelationValuesTypes) {
          model.relationFields.forEach((field) => {
            writeRelation({ writer, field });
          });
        }
      })
      .write(`)`);
  }

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}Schema;`);
  }
};
