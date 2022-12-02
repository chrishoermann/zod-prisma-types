"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_helper_1 = require("@prisma/generator-helper");
const ts_morph_1 = require("ts-morph");
const directoryHelper_1 = require("./classes/directoryHelper");
const extendedDMMF_1 = require("./classes/extendedDMMF");
const functions_1 = require("./functions");
(0, generator_helper_1.generatorHandler)({
    onManifest: () => {
        return {
            defaultOutput: './generated/zod',
            prettyName: 'Zod Prisma Types',
        };
    },
    onGenerate: async (options) => {
        const path = options.generator.output;
        const config = options.generator.config;
        if (!path)
            throw new Error('No output path specified');
        const extendendDMMF = new extendedDMMF_1.ExtendedDMMF(options.dmmf, config);
        const project = new ts_morph_1.Project({
            tsConfigFilePath: './tsconfig.json',
            skipAddingFilesFromTsConfig: true,
        });
        directoryHelper_1.DirectoryHelper.pathExistsElseCreate(path.value);
        const indexSource = project.createSourceFile(`${path.value}/index.ts`, {
            statements: [
                ...(0, functions_1.getImportStatements)(extendendDMMF),
                ...(0, functions_1.getEnumStatements)(extendendDMMF),
                ...(0, functions_1.getHelperStatements)(extendendDMMF),
                ...(0, functions_1.getModelStatements)(extendendDMMF),
                ...(0, functions_1.getIncludeSelectStatements)(extendendDMMF),
                ...(0, functions_1.getInputTypeStatements)(extendendDMMF),
                ...(0, functions_1.getArgTypeStatements)(extendendDMMF),
            ],
        }, {
            overwrite: true,
        });
        indexSource.formatText({
            indentSize: 2,
            convertTabsToSpaces: true,
            ensureNewLineAtEndOfFile: true,
        });
        return project.save();
    },
});
//# sourceMappingURL=generator.js.map