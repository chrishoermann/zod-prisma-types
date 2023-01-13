import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading, writeJsDoc } from '../utils';
import { writeModelFields } from '.';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getModelStatements: GetStatements = (dmmf) => {
  if (!dmmf.generatorConfig.createModelTypes) return [];

  const statements: Statement[] = [writeHeading(`MODELS`, 'FAT')];

  dmmf.datamodel.models.forEach((model) => {
    // write standard model that represents the model type from prismas "index.d.ts"
    statements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => {
          writer.newLine();
          writeJsDoc(writer, model.clearedDocumentation);
        },
        declarations: [
          {
            name: `${model.formattedNames.original}Schema`,
            initializer(writer) {
              writer.write(`z.object({`);
              [...model.enumFields, ...model.scalarFields].forEach((field) => {
                writeModelFields({ writer, field, model, dmmf });
              });
              writer.write(`})`);
            },
          },
        ],
      }),
    );

    // check if a schema where fields with default values are optional should be generated
    if (model.writeOptionalDefaultValuesTypes()) {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => {
            writer.newLine();
            writeJsDoc(writer, model.clearedDocumentation);
          },
          declarations: [
            {
              name: `${model.formattedNames.original}OptionalDefaultsSchema`,
              initializer(writer) {
                writer.writeLine(
                  `${model.formattedNames.original}Schema.merge(`,
                );
                writer.write(`z.object({`);
                [...model.enumFields, ...model.scalarFields].forEach(
                  (field) => {
                    if (!field.isOptionalDefaultField()) return;

                    const options = {
                      writer,
                      field,
                      writeOptionalDefaults: true,
                    };

                    writeModelFields({ ...options, model, dmmf });
                  },
                );
                writer.writeLine(`})`).write(`)`);
              },
            },
          ],
        }),
      );
    }

    // check if a schema where relations are included should be generated
    // this is only done if the user has set the "createModelRelations" flag to true

    // todo:
    // - don't created relations model if the model has no relations
    // - do the relations need to be recursive or is just one layer sufficient?
    //   recursive could get tricky because then for each model a relations type needs to be created
    //   even if the model itself has no relations. Furthermore a z.ZodType<> would be needed.

    // if (dmmf.generatorConfig.createModelRelations) {
    //   statements.push(
    //     writeConstStatement({
    //       leadingTrivia: (writer) => {
    //         writer.newLine();
    //         writeJsDoc(writer, model.documentation);
    //       },
    //       declarations: [
    //         {
    //           name: `${model.formattedNames.original}WithRelationsSchema`,
    //           initializer(writer) {
    //             writer.writeLine(
    //               `${model.formattedNames.original}Schema.merge(`,
    //             );
    //             writer.write(`z.object({`);
    //             model.relationFields.forEach((field) => {
    //               const options = {
    //                 writer,
    //                 field,
    //               };
    //               return writeRelation(options);
    //             });
    //             writer.writeLine(`})`).write(`)`);
    //           },
    //         },
    //       ],
    //     }),
    //   );
    // }
  });

  return statements;
};
