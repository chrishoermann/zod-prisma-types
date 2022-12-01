import { generatorHandler } from '@prisma/generator-helper';
import { Project, StructureKind } from 'ts-morph';

import { DirectoryHelper } from './classes/directoryHelper';
import { ExtendedDMMF } from './classes/extendedDMMF';
import {
  PRIMSA_IMPORT_STATEMENT,
  ZOD_IMPORT_STATEMENT,
} from './constants/importStatements';
import { getInputTypeStatements } from './statements';
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
    // - ...

    const ExtendendDMMF = new ExtendedDMMF(options.dmmf);

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

    const inputTypesImportStatements: Statement[] = [
      PRIMSA_IMPORT_STATEMENT,
      ZOD_IMPORT_STATEMENT,
    ];

    // CREATE SOURCE FILES
    //------------------------------------------------------

    const indexSource = project.createSourceFile(
      `${path.value}/index.ts`,
      {
        statements: [
          {
            kind: StructureKind.ExportDeclaration,
            moduleSpecifier: './inputTypesBase',
          },
        ],
      },
      {
        overwrite: true,
      },
    );

    const inputTypesBaseSource = project.createSourceFile(
      `${path.value}/inputTypesBase.ts`,
      { statements: inputTypesImportStatements },
      { overwrite: true },
    );

    // CREATE TYPES
    //------------------------------------------------------

    const inputTypeStatements = getInputTypeStatements(ExtendendDMMF);
    inputTypesBaseSource.addStatements(inputTypeStatements);

    // FORMAT SOURCE FILES
    //------------------------------------------------------

    indexSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    inputTypesBaseSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    // SAVE SOURCE FILES
    //------------------------------------------------------

    return project.save();
  },
});
