import {
  OptionalKind,
  StructureKind,
  VariableDeclarationKind,
  VariableDeclarationStructure,
  WriterFunction,
} from 'ts-morph';

import { Statement } from '../types';

interface WriteConstStatementOptions {
  declarations: OptionalKind<VariableDeclarationStructure>[];
  leadingTrivia?: string | WriterFunction | (string | WriterFunction)[];
}

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
