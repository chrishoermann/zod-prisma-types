"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportStatements = void 0;
const importStatements_1 = require("../constants/importStatements");
const getImportStatements = (datamodel) => {
    const statements = [
        importStatements_1.ZOD_IMPORT_STATEMENT,
        importStatements_1.PRIMSA_IMPORT_STATEMENT,
    ];
    if (datamodel.useDecimalJs()) {
        statements.push(importStatements_1.DECIMAL_JS_IMPORT_STATEMENT);
    }
    if (datamodel.useValidatorJs()) {
        console.log('use validator', datamodel.config);
        statements.push(importStatements_1.VALIDATOR_JS_IMPORT_STATEMENT);
    }
    return statements;
};
exports.getImportStatements = getImportStatements;
//# sourceMappingURL=getImportStatements.js.map