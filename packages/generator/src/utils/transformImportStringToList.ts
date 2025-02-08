/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const IMPORT_STATEMENT_REGEX = /"(?<statement>[\w\s"'${}/,:@;.*-]+)"/;

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const transformImportStringToList = (importString: string) => {
  const importList = importString
    .split(/(?<="),/g) // split at `"` that is followed by a `,`
    .map((statement) =>
      statement
        .trim()
        .match(IMPORT_STATEMENT_REGEX)
        ?.groups?.['statement'].replace(/["']/g, "'"),
    )
    .filter((statement): statement is string => typeof statement === 'string');

  return importList;
};
