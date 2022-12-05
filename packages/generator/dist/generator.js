"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = void 0;
const ts_morph_1 = require("ts-morph");
const directoryHelper_1 = require("./classes/directoryHelper");
const extendedDMMF_1 = require("./classes/extendedDMMF");
const functions_1 = require("./functions");
const generator = async ({ output, config, dmmf }) => {
    if (!output)
        throw new Error('No output path specified');
    console.log('config: ', config);
    const extendendDMMF = new extendedDMMF_1.ExtendedDMMF(dmmf, config);
    const project = new ts_morph_1.Project({
        tsConfigFilePath: './tsconfig.json',
        skipAddingFilesFromTsConfig: true,
    });
    directoryHelper_1.DirectoryHelper.pathExistsElseCreate(output.value);
    const indexSource = project.createSourceFile(`${output.value}/index.ts`, {
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
};
exports.generator = generator;
//# sourceMappingURL=generator.js.map