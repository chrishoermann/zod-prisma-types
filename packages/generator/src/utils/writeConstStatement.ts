import {
  OptionalKind,
  StructureKind,
  VariableDeclarationKind,
  VariableDeclarationStructure,
  WriterFunction,
} from 'ts-morph';

import { Statement } from '../types';

/////////////////////////////////////////////
// TYPES & INTERFACES
/////////////////////////////////////////////

interface WriteConstStatementOptions {
  declarations: OptionalKind<VariableDeclarationStructure>[];
  leadingTrivia?: string | WriterFunction | (string | WriterFunction)[];
}

/////////////////////////////////////////////
// FUNCITON
/////////////////////////////////////////////

/**
 * Makes writeing const statements less verbose.
 * @param param0 WriteConstStatementOptions
 * @returns ts-morph Statement
 */
export const writeConstStatement = ({
  declarations,
  leadingTrivia,
}: WriteConstStatementOptions): Statement => {
  return {
    leadingTrivia,
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations,
  };
};
