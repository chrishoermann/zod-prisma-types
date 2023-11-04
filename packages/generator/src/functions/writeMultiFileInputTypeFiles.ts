import {
  writeCustomEnum,
  writeDecimalJsLike,
  // writeDecimalJsLikeList,
  writeInclude,
  writeInputJsonValue,
  writeInputObjectType,
  writeIsValidDecimalInput,
  writeJsonValue,
  // writeNullableJsonValue,
  writePrismaEnum,
  writeSelect,
  // writeTransformJsonNull,
} from '.';
import { FileWriter } from '../classes';
import { CreateFiles } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeInputTypeFiles: CreateFiles = ({ path, dmmf }) => {
  const { inputTypePath, writeBarrelFiles } = dmmf.generatorConfig;

  // WRITE INDEX FILE
  // ------------------------------------------------------------
  const indexFileWriter = new FileWriter();

  const folderPath = indexFileWriter.createPath(`${path}/${inputTypePath}`);

  if (folderPath) {
    if (writeBarrelFiles) {
      indexFileWriter.createFile(
        `${folderPath}/index.ts`,
        ({ writeExport }) => {
          if (dmmf.generatorConfig.createInputTypes) {
            dmmf.schema.inputObjectTypes.prisma.forEach(({ name }) => {
              writeExport(`{ ${name}Schema }`, `./${name}Schema`);
            });
          }

          dmmf.schema.enumTypes.prisma.forEach(({ name }) => {
            writeExport(`{ ${name}Schema }`, `./${name}Schema`);
          });

          dmmf.datamodel.enums.forEach(({ name }) => {
            writeExport(`{ ${name}Schema }`, `./${name}Schema`);
          });

          if (dmmf.schema.hasJsonTypes) {
            // writeExport(`{ transformJsonNull }`, `./transformJsonNull`);
            // writeExport(`{ NullableJsonValue }`, `./NullableJsonValue`);
            writeExport(`{ InputJsonValueSchema }`, `./InputJsonValueSchema`);
            writeExport(`{ JsonValueSchema }`, `./JsonValueSchema`);
          }

          if (dmmf.schema.hasDecimalTypes) {
            writeExport(`{ DecimalJsLikeSchema }`, `./DecimalJsLikeSchema`);
            // writeExport(
            //   `{ DecimalJSLikeListSchema }`,
            //   `./DecimalJsLikeListSchema`,
            // );
            writeExport(
              `{ isValidDecimalInput, DECIMAL_STRING_REGEX }`,
              `./isValidDecimalInput`,
            );
          }
        },
      );
    }

    ////////////////////////////////////////////////////
    // WRITE HELPER FUNCTIONS & SCHEMAS
    ////////////////////////////////////////////////////

    // JSON
    // ------------------------------------------------------------

    if (dmmf.schema.hasJsonTypes) {
      // new FileWriter().createFile(
      //   `${folderPath}/transformJsonNull.ts`,
      //   (fileWriter) => writeTransformJsonNull({ fileWriter, dmmf }),
      // );

      new FileWriter().createFile(
        `${folderPath}/JsonValueSchema.ts`,
        (fileWriter) => writeJsonValue({ fileWriter, dmmf }),
      );

      // new FileWriter().createFile(
      //   `${folderPath}/NullableJsonValue.ts`,
      //   (fileWriter) => writeNullableJsonValue({ fileWriter, dmmf }),
      // );

      new FileWriter().createFile(
        `${folderPath}/InputJsonValueSchema.ts`,
        (fileWriter) => writeInputJsonValue({ fileWriter, dmmf }),
      );
    }

    // DECIMAL
    // ------------------------------------------------------------

    if (dmmf.schema.hasDecimalTypes) {
      new FileWriter().createFile(
        `${folderPath}/DecimalJsLikeSchema.ts`,
        (fileWriter) => writeDecimalJsLike({ fileWriter, dmmf }),
      );

      // new FileWriter().createFile(
      //   `${folderPath}/DecimalJsLikeListSchema.ts`,
      //   (fileWriter) => writeDecimalJsLikeList({ fileWriter, dmmf }),
      // );

      new FileWriter().createFile(
        `${folderPath}/isValidDecimalInput.ts`,
        (fileWriter) => writeIsValidDecimalInput({ fileWriter, dmmf }),
      );
    }

    ////////////////////////////////////////////////////
    // WRITE ENUMS
    ////////////////////////////////////////////////////

    dmmf.schema.enumTypes.prisma.forEach((enumData) => {
      new FileWriter().createFile(
        `${folderPath}/${enumData.name}Schema.ts`,
        (fileWriter) => writePrismaEnum({ fileWriter, dmmf }, enumData),
      );
    });

    dmmf.datamodel.enums.forEach((enumData) => {
      new FileWriter().createFile(
        `${folderPath}/${enumData.name}Schema.ts`,
        (fileWriter) => writeCustomEnum({ fileWriter, dmmf }, enumData),
      );
    });

    ////////////////////////////////////////////////////
    // SKIP INPUT TYPES
    ////////////////////////////////////////////////////

    if (!dmmf.generatorConfig.createInputTypes) return;

    ////////////////////////////////////////////////////
    // WRITER INCLUDE & SELECT
    ////////////////////////////////////////////////////

    dmmf.schema.outputObjectTypes.model.forEach((model) => {
      if (model.hasRelationField()) {
        new FileWriter().createFile(
          `${folderPath}/${model.name}IncludeSchema.ts`,
          (fileWriter) => writeInclude({ fileWriter, dmmf }, model),
        );
      }

      new FileWriter().createFile(
        `${folderPath}/${model.name}SelectSchema.ts`,
        (fileWriter) => writeSelect({ fileWriter, dmmf }, model),
      );
    });

    ////////////////////////////////////////////////////
    // WRITE INPUT TYPE FILES
    ////////////////////////////////////////////////////

    dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
      new FileWriter().createFile(
        `${folderPath}/${inputType.name}Schema.ts`,
        (fileWriter) => writeInputObjectType({ fileWriter, dmmf }, inputType),
      );
    });
  }
};
