import { generatorHandler } from '@prisma/generator-helper';
import { Project, StructureKind } from 'ts-morph';

import { DirectoryHelper } from './classes/directoryHelper';
import { ExtendedDMMF } from './classes/extendedDMMF';
import {
  ENUM_IMPORT_STATEMENT,
  PRIMSA_IMPORT_STATEMENT,
  ZOD_IMPORT_STATEMENT,
} from './constants/importStatements';
import {
  getEnumStatements,
  getFilterBaseStatements,
  getModelStatements,
} from './statements';
import { Statement } from './types';

generatorHandler({
  onManifest: () => {
    return {
      defaultOutput: './generated/zod',
      prettyName: 'Zod Prisma Types',
    };
  },
  onGenerate: async (options) => {
    const path = options.generator.output;

    if (!path) throw new Error('No output path specified');

    // EXTENDED DMMF
    //--------------------------------------------------------------------------------

    // Create an instance of the extended DMMF class
    // This class extends the Prisma DMMF with additional information like
    // - name of models, enums and fields in different formats (uppercase, pascalcase, camelcase)
    // - helper methods for generating types

    const { datamodel } = new ExtendedDMMF(options.dmmf);

    // CREATE TS-MORPH PROJECT
    //--------------------------------------------------------------------------------

    // Ts-morph is used to generate the TypeScript files
    // For further information see: https://ts-morph.com/

    const project = new Project({
      tsConfigFilePath: './tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });

    // CREATE PATH
    //------------------------------------------------------

    DirectoryHelper.pathExistsElseCreate(path.value);

    // CREATE IMPORT STATEMENTS
    //------------------------------------------------------

    const enumImportStatements: Statement[] = [
      PRIMSA_IMPORT_STATEMENT,
      ZOD_IMPORT_STATEMENT,
    ];

    const modelImportStatements: Statement[] = [
      PRIMSA_IMPORT_STATEMENT,
      ZOD_IMPORT_STATEMENT,
    ];

    const filterBaseImportStatements: Statement[] = [
      PRIMSA_IMPORT_STATEMENT,
      ZOD_IMPORT_STATEMENT,
    ];

    // CONDITIONALLY EXTEND IMPORT STATEMENTS
    //------------------------------------------------------

    if (datamodel.enums.length > 0) {
      modelImportStatements.push(ENUM_IMPORT_STATEMENT);
    }

    // CREATE SOURCE FILES
    //------------------------------------------------------

    const indexSource = project.createSourceFile(
      `${path.value}/index.ts`,
      {
        statements: [
          {
            kind: StructureKind.ExportDeclaration,
            moduleSpecifier: './enum',
          },
          {
            kind: StructureKind.ExportDeclaration,
            moduleSpecifier: './filterBase',
          },
          {
            kind: StructureKind.ExportDeclaration,
            moduleSpecifier: './model',
          },
        ],
      },
      {
        overwrite: true,
      },
    );

    const enumSource = project.createSourceFile(
      `${path.value}/enum.ts`,
      { statements: enumImportStatements },
      { overwrite: true },
    );

    const modelSource = project.createSourceFile(
      `${path.value}/model.ts`,
      { statements: modelImportStatements },
      { overwrite: true },
    );

    const filterBaseSource = project.createSourceFile(
      `${path.value}/filterBase.ts`,
      { statements: filterBaseImportStatements },
      { overwrite: true },
    );

    //////////////////////////////////////////////////////////////
    // CREATE TYPES
    //////////////////////////////////////////////////////////////

    // CREATE ENUM
    //------------------------------------------------------

    const filterBaseStatements = getFilterBaseStatements(datamodel);
    filterBaseSource.addStatements(filterBaseStatements);

    const enumStatements = getEnumStatements(datamodel);
    enumSource.addStatements(enumStatements);

    const modelStatements = getModelStatements(datamodel);
    modelSource.addStatements(modelStatements);

    // FORMAT SOURCE FILES
    //------------------------------------------------------

    indexSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    enumSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    modelSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    filterBaseSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    // SAVE SOURCE FILES
    //------------------------------------------------------

    return project.save();
  },
});
