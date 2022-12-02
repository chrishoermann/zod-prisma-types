import { WriterFunction } from 'ts-morph';
import { FormattedNames } from './formattedNames';
type BaseFilterKeys = 'base' | 'nested' | 'aggregates' | 'nestedAggregates';
export type WriteBaseFilterTypesFunction = (
  options?: WriteBaseFilterTypesFunctionOptions,
) => WriterFunction;
export type FilterCallerMap = {
  standard: FilterMap;
  nullable: FilterMap;
};
type FilterMap = {
  [key in BaseFilterKeys]: WriteBaseFilterTypesFunctionOptions;
};
export interface WriteBaseFilterTypesFunctionOptions {
  nullable?: boolean;
  aggregates?: boolean;
}
export interface WriteBaseFilterTypesOptions {
  initializerFunction: WriteBaseFilterTypesFunction;
  filterTypesFunction: WriteBaseFilterTypesFunction;
  typeKey: string;
}
export declare class WriteBaseFilterTypes extends FormattedNames {
  constructor(options: WriteBaseFilterTypesOptions);
  getFilterTypes(): any;
}
export {};
//# sourceMappingURL=writeFilterTypes.d.ts.map
