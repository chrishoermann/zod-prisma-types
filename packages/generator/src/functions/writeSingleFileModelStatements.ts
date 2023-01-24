import { writeModelFields } from '../utils';
import { type WriteStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeSingleFileModelStatements: WriteStatements = (
  dmmf,
  { writer, writeHeading, writeJSDoc },
) => {
  writeHeading(`MODELS`, 'FAT');

  dmmf.datamodel.models.forEach((model) => {
    // write standard model that represents the model type from prismas "index.d.ts"

    writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM');
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
        .write(`))`)
        .blankLine();
    }
  });
};
