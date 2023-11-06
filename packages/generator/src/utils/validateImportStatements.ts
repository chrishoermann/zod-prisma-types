/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const IMPORT_STATEMENT_REGEX_PATTERN =
  /(?<type>[\w]+)(\(\[)(?<imports>[\w\s"@'${}/,;:.~*-]+)(\]\))/;

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const validateImportStatements = (
  importString: string,
  errorLocation: string,
) => {
  const importStatementMatch = importString.match(
    IMPORT_STATEMENT_REGEX_PATTERN,
  )?.groups?.['imports'];

  console.log(importStatementMatch);

  if (!importStatementMatch) {
    throw new Error(
      `[@zod generator error]: import statement is not valid. Check for unusal characters. ${errorLocation}`,
    );
  }

  return importStatementMatch;
};
