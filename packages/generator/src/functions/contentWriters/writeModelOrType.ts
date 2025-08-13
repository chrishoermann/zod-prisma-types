import { writeModelFields } from '.';
import { ExtendedDMMFModel, writeImportStatementOptions } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeRelation } from '../fieldWriters';

//// NEEDS REFACTORING ////
// This function is a mess and needs to be refactored into smaller, more manageable pieces.

export const writeModelOrType = (
  {
    fileWriter: { writer, writeImports, writeJSDoc, writeHeading },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFModel,
) => {
  const { useMultipleFiles, createRelationValuesTypes } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    const imports: writeImportStatementOptions[] = [];
    imports.push({ name: 'z', path: 'zod' });
    imports.push(...model.imports);

    if (createRelationValuesTypes && model.hasRelationFields) {
      // import the necessary types to handle json nulls
      if (model.hasOptionalJsonFields) {
        imports.push({
          name: 'JsonValueType',
          path: `../inputTypeSchemas/JsonValueSchema`,
          isTypeOnly: true,
        });
      }

      // const importSet = new Set<string>();

      model.filteredRelationFields.forEach((field) => {
        const importPath = `./${field.type}Schema`;
        const withRelationsOrNot = !field.isCompositeType
          ? 'WithRelations'
          : '';
        imports.push({
          name: `${field.type}${withRelationsOrNot}`,
          path: importPath,
          isTypeOnly: true,
        });
        imports.push({
          name: `${field.type}${withRelationsOrNot}Schema`,
          path: importPath,
        });

        if (model.writePartialTypes) {
          imports.push({
            name: `${field.type}Partial${withRelationsOrNot}`,
            path: importPath,
            isTypeOnly: true,
          });
          imports.push({
            name: `${field.type}Partial${withRelationsOrNot}Schema`,
            path: importPath,
          });
        }

        if (model.writeOptionalDefaultValuesTypes) {
          imports.push({
            name: `${field.type}OptionalDefaults${withRelationsOrNot}`,
            path: importPath,
            isTypeOnly: true,
          });
          imports.push({
            name: `${field.type}OptionalDefaults${withRelationsOrNot}Schema`,
            path: importPath,
          });
        }
      });
    }
    writeImports(imports);
  }

  writer.blankLine();

  writeHeading(`${model.formattedNames.upperCaseSpace} SCHEMA`, 'FAT');

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
    });

  if (model.zodCustomErrors) {
    writer.write(`, ${model.zodCustomErrors}`);
  }

  writer.write(`)`);

  writer
    .blankLine()
    .write(`export type ${model.name} = z.infer<typeof ${model.name}Schema>`);

  // WRITE CUSTOM VALIDATORS VALUE TYPES
  // -------------------------------------------

  if (model.zodCustomValidators) {
    writer.blankLine();

    writeHeading(
      `${model.formattedNames.upperCaseSpace} CUSTOM VALIDATORS SCHEMA`,
      'FAT',
    );

    writer.blankLine();

    writer.write(
      `export const ${model.name}CustomValidatorsSchema = ${model.name}Schema`,
    );

    model.zodCustomValidators.forEach((validator) => {
      writer.write(validator);
    });

    writer
      .blankLine()
      .write(
        `export type ${model.name}CustomValidators = z.infer<typeof ${model.name}CustomValidatorsSchema>`,
      );
  }

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
              !field.isCompositeType,
              `${field.type}WithRelations`,
            )
            .conditionalWrite(field.isCompositeType, `${field.type}`)
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
            writer.write(`${field.name}?: JsonValueType | null;`).newLine();
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
              !field.isCompositeType,
              `${field.type}OptionalDefaultsWithRelations`,
            )
            .conditionalWrite(
              field.isCompositeType,
              `${field.type}OptionalDefaults`,
            )
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
            writer.write(`${field.name}?: JsonValueType | null;`).newLine();
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
              !field.isCompositeType,
              `${field.type}PartialWithRelations`,
            )
            .conditionalWrite(field.isCompositeType, `${field.type}Partial`)
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
            writer.write(`${field.name}?: JsonValueType | null;`).newLine();
          });
        })
        .write(` & `)
        .write(`${model.name}PartialRelations`);
    } else {
      writer
        .write(
          `export type ${model.name}PartialWithRelations = z.infer<typeof ${model.name}PartialSchema> & `,
        )
        .write(`${model.name}PartialRelations`);
    }

    // writer.write(`${model.name}PartialRelations`);

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

    // WRITE OPTIONAL DEFAULTS PARTIAL RELATION VALUE TYPES
    // -------------------------------------------

    if (model.writeOptionalDefaultsRelationValueTypes) {
      writer.blankLine();

      if (model.hasOptionalJsonFields) {
        writer
          .write(
            `export type ${model.name}OptionalDefaultsWithPartialRelations = Omit<z.infer<typeof ${model.name}OptionalDefaultsSchema>, ${model.optionalJsonFieldUnion}> & `,
          )
          .inlineBlock(() => {
            model.optionalJsonFields.forEach((field) => {
              writer.write(`${field.name}?: JsonValueType | null;`).newLine();
            });
          })
          .write(` & `);
      } else {
        writer.write(
          `export type ${model.name}OptionalDefaultsWithPartialRelations = z.infer<typeof ${model.name}OptionalDefaultsSchema> & `,
        );
      }

      writer.write(`${model.name}PartialRelations`);

      writer
        .blankLine()
        .write(
          `export const ${model.name}OptionalDefaultsWithPartialRelationsSchema: z.ZodType<${model.name}OptionalDefaultsWithPartialRelations> = ${model.name}OptionalDefaultsSchema.merge(z.object(`,
        )
        .inlineBlock(() => {
          model.relationFields.forEach((field) => {
            // update so it writes [ModleName]OptionalDefaultsWithRelationsSchema
            writeRelation({
              writer,
              field,
              isPartial: true,
            });
          });
        })
        .write(`).partial())`);
    }

    // WRITE PARTIAL RELATION VALUE TYPES
    // -------------------------------------------

    if (model.writeRelationValueTypes) {
      writer.blankLine();

      if (model.hasOptionalJsonFields) {
        writer
          .write(
            `export type ${model.name}WithPartialRelations = Omit<z.infer<typeof ${model.name}Schema>, ${model.optionalJsonFieldUnion}> & `,
          )
          .inlineBlock(() => {
            model.optionalJsonFields.forEach((field) => {
              writer.write(`${field.name}?: JsonValueType | null;`).newLine();
            });
          })
          .write(` & `);
      } else {
        writer.write(
          `export type ${model.name}WithPartialRelations = z.infer<typeof ${model.name}Schema> & `,
        );
      }

      writer.write(`${model.name}PartialRelations`);

      writer
        .blankLine()
        .write(
          `export const ${model.name}WithPartialRelationsSchema: z.ZodType<${model.name}WithPartialRelations> = ${model.name}Schema.merge(z.object(`,
        )
        .inlineBlock(() => {
          model.relationFields.forEach((field) => {
            // update so it writes [ModleName]OptionalDefaultsWithRelationsSchema
            writeRelation({
              writer,
              field,
              isPartial: true,
            });
          });
        })
        .write(`).partial())`);
    }
  }

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}Schema;`);
  }
};
