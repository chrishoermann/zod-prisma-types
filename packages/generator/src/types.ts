import { StatementStructures, WriterFunction } from 'ts-morph';

export type StatementsArray = Statement[];
export type Statement = string | WriterFunction | StatementStructures;
