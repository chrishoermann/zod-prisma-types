/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

const importStatementRegex = `(?<imports>[\\w\\s"@'\${}/,;:.~*-]+)`;
const importStatementRegexPattern = `(?<import>[\\w]+)(\\(\\[${importStatementRegex}\\]\\))`;

export const IMPORT_STATEMENT_REGEX = new RegExp(importStatementRegex);
export const IMPORT_STATEMENT_REGEX_PATTERN = new RegExp(
  importStatementRegexPattern,
);

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const validateImportStatement = (
  importString: string,
  errorLocation: string,
) => {
  const importStatementMatch = importString.match(
    IMPORT_STATEMENT_REGEX_PATTERN,
  )?.groups?.['imports'];

  if (!importStatementMatch) {
    throw new Error(
      `[@zod generator error]: import statement is not valid. Check for unusal characters. ${errorLocation}`,
    );
  }

  return importStatementMatch;
};
