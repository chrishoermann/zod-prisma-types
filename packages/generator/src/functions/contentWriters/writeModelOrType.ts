import { writeModelFields } from '.';
import { ExtendedDMMFModel } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeRelation } from '../fieldWriters';

export const writeModelOrType = (
  {
    fileWriter: {
      writer,
      writeImport,
      writeImportSet,
      writeJSDoc,
      writeHeading,
    },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFModel,
) => {
  const { useMultipleFiles, createRelationValuesTypes, inputTypePath } =
    dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImportSet(model.imports);

    if (createRelationValuesTypes && model.hasRelationFields) {
      // import the necessary types to handle json nulls
      if (model.hasOptionalJsonFields) {
        writeImport(
          `type { NullableJsonInput }`,
          `../${inputTypePath}/transformJsonNull`,
        );
      }

      const imports = new Set<string>();
      const typeImports: string[][] = [];
      const schemaImports: string[][] = [];

      model.filterdRelationFields.forEach((field) => {
        if (!dmmf.generatorConfig.isMongoDb) {
          typeImports.push([
            `${field.type}WithRelations`,
            `${field.type}Schema`,
          ]);
          schemaImports.push([
            `${field.type}WithRelationsSchema`,
            `${field.type}Schema`,
          ]);

          if (model.writePartialTypes) {
            typeImports.push([
              `${field.type}PartialWithRelations`,
              `${field.type}Schema`,
            ]);
            schemaImports.push([
              `${field.type}PartialWithRelationsSchema`,
              `${field.type}Schema`,
            ]);
          }

          if (model.writeOptionalDefaultValuesTypes) {
            typeImports.push([
              `${field.type}OptionalDefaultsRelations`,
              `${field.type}Schema`,
            ]);
            schemaImports.push([
              `${field.type}OptionalDefaultsWithRelationsSchema`,
              `${field.type}Schema`,
            ]);
          }
        } else {
          typeImports.push([`${field.type}`, `${field.type}Schema`]);
          schemaImports.push([`${field.type}Schema`, `${field.type}Schema`]);
        }
      });

      typeImports.forEach((type) => {
        imports.add(`import type { ${type[0]} } from './${type[1]}'`);
      });

      schemaImports.forEach((schema) => {
        imports.add(`import { ${schema[0]} } from './${schema[1]}'`);
      });

      writeImportSet(imports);
    }
  }

  writer.blankLine();

  writeHeading(`${model.formattedNames.upperCaseSpace} SCHEMA`, 'FAT');

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

  writer
    .blankLine()
    .write(`export type ${model.name} = z.infer<typeof ${model.name}Schema>`);

  if (model.writePartialTypes) {
    writer.blankLine();

    writeHeading(
      `${model.formattedNames.upperCaseSpace} PARTIAL SCHEMA`,
      'FAT',
    );

    writer
      .blankLine()
      .write(
        `export const ${model.name}PartialSchema = ${model.name}Schema.partial()`,
      );

    writer
      .blankLine()
      .write(
        `export type ${model.name}Partial = z.infer<typeof ${model.name}PartialSchema>`,
      );
  }

  // WRITE OPTIONAL DEFAULTS VALUE TYPES
  // -------------------------------------------

  if (model.writeOptionalDefaultValuesTypes) {
    writer.blankLine();

    writeHeading(
      `${model.formattedNames.upperCaseSpace} OPTIONAL DEFAULTS SCHEMA`,
      useMultipleFiles ? 'FAT' : 'SLIM',
    );

    writer
      .blankLine()
      .write(`export const ${model.name}OptionalDefaultsSchema = `)
      .write(`${model.name}Schema.merge(z.object(`)
      .inlineBlock(() => {
        [...model.enumFields, ...model.scalarFields].forEach((field) => {
          if (!field.isOptionalDefaultField) return;

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

    writer
      .blankLine()
      .write(
        `export type ${model.name}OptionalDefaults = z.infer<typeof ${model.name}OptionalDefaultsSchema>`,
      );
  }

  // WRITE RELATION VALUE TYPES
  // -------------------------------------------

  if (model.writeRelationValueTypes) {
    writer.blankLine();

    writeHeading(
      `${model.formattedNames.upperCaseSpace} RELATION SCHEMA`,
      useMultipleFiles ? 'FAT' : 'SLIM',
    );

    writer
      .blankLine()
      .write(`export type ${model.name}Relations = `)
      .inlineBlock(() => {
        model.relationFields.forEach((field) => {
          writer
            .conditionalWrite(field.omitInModel(), '// omitted: ')
            .write(field.name)
            .conditionalWrite(!field.isRequired, '?')
            .write(': ')
            .conditionalWrite(
              !dmmf.generatorConfig.isMongoDb,
              `${field.type}WithRelations`,
            )
            .conditionalWrite(dmmf.generatorConfig.isMongoDb, `${field.type}`)
            .conditionalWrite(field.isList, '[]')
            .conditionalWrite(!field.isRequired, ' | null')
            .write(';')
            .newLine();
        });
      })
      .write(`;`)
      .blankLine();

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
    } else {
      writer.write(
        `export type ${model.name}WithRelations = z.infer<typeof ${model.name}Schema> & `,
      );
    }

    writer.write(`${model.name}Relations`);

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
    // .blankLine();
  }

  // WRITE OPTIONAL DEFAULT RELATION VALUE TYPES
  // -------------------------------------------

  if (model.writeOptionalDefaultsRelationValueTypes) {
    writer.blankLine();

    writeHeading(
      `${model.formattedNames.upperCaseSpace} OPTIONAL DEFAULTS RELATION SCHEMA`,
      useMultipleFiles ? 'FAT' : 'SLIM',
    );

    writer
      .blankLine()
      .write(`export type ${model.name}OptionalDefaultsRelations = `)
      .inlineBlock(() => {
        model.relationFields.forEach((field) => {
          writer
            .conditionalWrite(field.omitInModel(), '// omitted: ')
            .write(field.name)
            .conditionalWrite(!field.isRequired, '?')
            .write(': ')
            .conditionalWrite(
              !dmmf.generatorConfig.isMongoDb,
              `${field.type}OptionalDefaultsWithRelations`,
            )
            .conditionalWrite(dmmf.generatorConfig.isMongoDb, `${field.type}`)
            .conditionalWrite(field.isList, '[]')
            .conditionalWrite(!field.isRequired, ' | null')
            .write(';')
            .newLine();
        });
      })
      .write(`;`)
      .blankLine();

    if (model.hasOptionalJsonFields) {
      writer
        .write(
          `export type ${model.name}OptionalDefaultsWithRelations = Omit<z.infer<typeof ${model.name}OptionalDefaultsSchema>, ${model.optionalJsonFieldUnion}> & `,
        )
        .inlineBlock(() => {
          model.optionalJsonFields.forEach((field) => {
            writer.write(`${field.name}?: NullableJsonInput;`).newLine();
          });
        })
        .write(` & `);
    } else {
      writer.write(
        `export type ${model.name}OptionalDefaultsWithRelations = z.infer<typeof ${model.name}OptionalDefaultsSchema> & `,
      );
    }

    writer.write(`${model.name}OptionalDefaultsRelations`);

    writer
      .blankLine()
      .write(
        `export const ${model.name}OptionalDefaultsWithRelationsSchema: z.ZodType<${model.name}OptionalDefaultsWithRelations> = ${model.name}OptionalDefaultsSchema.merge(z.object(`,
      )
      .inlineBlock(() => {
        model.relationFields.forEach((field) => {
          // update so it writes [ModleName]OptionalDefaultsWithRelationsSchema
          writeRelation({
            writer,
            field,
            isOptionalDefaults: true,
          });
        });
      })
      .write(`))`);
    // .blankLine();
  }

  // WRITE PARTIAL RELATION VALUE TYPES
  // -------------------------------------------

  if (model.writePartialRelationValueTypes) {
    writer.blankLine();

    writeHeading(
      `${model.formattedNames.upperCaseSpace} PARTIAL RELATION SCHEMA`,
      useMultipleFiles ? 'FAT' : 'SLIM',
    );

    writer
      .blankLine()
      .write(`export type ${model.name}PartialRelations = `)
      .inlineBlock(() => {
        model.relationFields.forEach((field) => {
          writer
            .conditionalWrite(field.omitInModel(), '// omitted: ')
            .write(field.name)
            .write('?')
            .write(': ')
            .conditionalWrite(
              !dmmf.generatorConfig.isMongoDb,
              `${field.type}PartialWithRelations`,
            )
            .conditionalWrite(dmmf.generatorConfig.isMongoDb, `${field.type}`)
            .conditionalWrite(field.isList, '[]')
            .conditionalWrite(!field.isRequired, ' | null')
            .write(';')
            .newLine();
        });
      })
      .write(`;`)
      .blankLine();

    if (model.hasOptionalJsonFields) {
      writer
        .write(
          `export type ${model.name}PartialWithRelations = Omit<z.infer<typeof ${model.name}PartialSchema>, ${model.optionalJsonFieldUnion}> & `,
        )
        .inlineBlock(() => {
          model.optionalJsonFields.forEach((field) => {
            writer.write(`${field.name}?: NullableJsonInput;`).newLine();
          });
        })
        .write(` & `);
    } else {
      writer.write(
        `export type ${model.name}PartialWithRelations = z.infer<typeof ${model.name}PartialSchema> & `,
      );
    }

    writer.write(`${model.name}PartialRelations`);

    writer
      .blankLine()
      .write(
        `export const ${model.name}PartialWithRelationsSchema: z.ZodType<${model.name}PartialWithRelations> = ${model.name}PartialSchema.merge(z.object(`,
      )
      .inlineBlock(() => {
        model.relationFields.forEach((field) => {
          writeRelation({ writer, field, isPartial: true });
        });
      })
      .write(`)).partial()`);
  }

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}Schema;`);
  }
};
