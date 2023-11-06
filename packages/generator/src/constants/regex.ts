/////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////

// PRISMA FUNCTION TYPES W/ VALIDATORS
// ----------------------------------------

export const PRISMA_FUNCTION_TYPES_WITH_VALIDATORS =
  /CreateInput|CreateWithout|CreateMany|UpdateInput|UpdateWithout|UpdateMany/;

export const PRISMA_FUNCTION_TYPES_WITH_VALIDATORS_WHERE_UNIQUE =
  /CreateInput|CreateWithout|CreateMany|UpdateInput|UpdateWithout|UpdateMany|WhereUnique/;

// IMPORT STATEMENT
// ----------------------------------------

/////////////////////////////////////////////////
// IMPORT STATEMENT
/////////////////////////////////////////////////

/**
 *   @deprecated
 */
// export const IMPORT_STATEMENT_REGEX_PATTERN =
//   /@zod\.(?<type>[\w]+)(\(\[)(?<imports>[\w "'${}/,;.*-]+)(\]\))/;

/**
 *   @deprecated
 */
export const IMPORT_STATEMENT_REGEX_PATTERN_ENHANCED =
  /@zod(\.(?<type>[\w]+))?(\.import\(\[(?<imports>[\w "'${}/,;.*-]+)\]\))?(\.refine\((?<refine>[\w\W]+)\))?/;
