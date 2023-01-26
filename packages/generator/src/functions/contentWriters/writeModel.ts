import { writeModelFields } from '.';
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
  const {
    useMultipleFiles,
    createRelationValuesTypes: createRelationValuesTypes,
    inputTypePath,
  } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImportSet(model.imports);

    if (createRelationValuesTypes && model.hasRelationFields) {
      if (model.hasOptionalJsonFields) {
        writeImport(
          `{ NullableJsonInput }`,
          `../${inputTypePath}/transformJsonNull`,
        );
      }

      writeImportSet(
        new Set(
          model.relationFields
            .map((field) => [
              `import { type ${field.type}WithRelations, ${field.type}WithRelationsSchema } from './${field.type}Schema'`,
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
        writer.conditionalWrite(field.omitInModel(), '// omitted: ');

        writeModelFields({
          writer,
          field,
          model,
          dmmf,
        });
      });
    })
    .write(`)`);

  if (model.writeOptionalDefaultValuesTypes) {
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

          writer.conditionalWrite(field.omitInModel(), '// omitted: ');

          writeModelFields({
            ...writeOptions,
            model,
            dmmf,
          });
        });
      })
      .write(`))`);
  }

  if (createRelationValuesTypes && model.hasRelationFields) {
    writer
      .blankLine()
      .conditionalWrite(
        !model.hasOptionalJsonFields,
        `export type ${model.name}WithRelations = z.infer<typeof ${model.name}Schema> & `,
      );

    if (model.hasOptionalJsonFields) {
      writer
        .write(
          `export type ${model.name}WithRelations = Omit<z.infer<typeof ${model.name}Schema>, ${model.optionalJsonFieldUnion}> & `,
        )
        .inlineBlock(() => {
          model.optionalJsonFields.forEach((field) => {
            writer.write(`${field.name}?: NullableJsonInput;`).newLine();
          });
        })
        .write(` & `);
    }

    writer.inlineBlock(() => {
      model.relationFields.forEach((field) => {
        writer
          .conditionalWrite(field.omitInModel(), '// omitted: ')
          .write(field.name)
          .conditionalWrite(!field.isRequired, '?')
          .write(': ')
          .write(`${field.type}WithRelations`)
          .conditionalWrite(field.isList, '[]')
          .conditionalWrite(!field.isRequired, ' | null')
          .write(';')
          .newLine();
      });
    });

    writer
      .blankLine()
      .write(
        `export const ${model.name}WithRelationsSchema: z.ZodType<${model.name}WithRelations> = ${model.name}Schema.merge(z.object(`,
      )
      .inlineBlock(() => {
        model.relationFields.forEach((field) => {
          writeRelation({ writer, field });
        });
      })
      .write(`))`);
  }

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}Schema;`);
  }
};
