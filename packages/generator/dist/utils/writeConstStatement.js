"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeConstStatement = void 0;
const ts_morph_1 = require("ts-morph");
const writeConstStatement = ({ declarations, leadingTrivia, }) => {
    return {
        leadingTrivia,
        kind: ts_morph_1.StructureKind.VariableStatement,
        declarationKind: ts_morph_1.VariableDeclarationKind.Const,
        isExported: true,
        declarations,
    };
};
exports.writeConstStatement = writeConstStatement;
//# sourceMappingURL=writeConstStatement.js.map