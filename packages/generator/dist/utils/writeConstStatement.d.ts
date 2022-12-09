import {
  OptionalKind,
  VariableDeclarationStructure,
  WriterFunction,
} from 'ts-morph';
import { Statement } from '../types';
interface WriteConstStatementOptions {
  declarations: OptionalKind<VariableDeclarationStructure>[];
  leadingTrivia?: string | WriterFunction | (string | WriterFunction)[];
}
export declare const writeConstStatement: ({
  declarations,
  leadingTrivia,
}: WriteConstStatementOptions) => Statement;
export {};
//# sourceMappingURL=writeConstStatement.d.ts.map
