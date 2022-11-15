export interface ParseDocumentationValues {
  /**
   * @generate.enum.listFilter in prisma enum comment
   */
  enumListFilter: boolean;

  /**
   * '@generate.enum.filter' in prisma enum comment
   */
  enumFilter: boolean;
}

export const ENUM_LIST_FILTER = '@generate.enum.listFilter';
export const ENUM_FILTER = '@generate.enum.filter';

const DEFAULT_RETURN: ParseDocumentationValues = {
  enumListFilter: false,
  enumFilter: false,
};

export const parseDocumentation = (
  documentation?: string,
): ParseDocumentationValues => {
  if (!documentation) return DEFAULT_RETURN;

  return {
    ...DEFAULT_RETURN,
    enumListFilter: documentation.includes(ENUM_LIST_FILTER),
    enumFilter: documentation.includes(ENUM_FILTER),
  };
};
