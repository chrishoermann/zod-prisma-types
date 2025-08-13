import { writeImportStatementOptions } from '../classes';

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

const rIdentifier = `[^\\s0-9{}][^\\s{}]+`;
const rIdentifierWithAs = `${rIdentifier}(\\s+as\\s+${rIdentifier})?`;
const rIdentifierWithAsAndType = `(type\\s+)?${rIdentifierWithAs}`;
const importStatementRegex = `"\\s*import\\s+(?<isType>type)?\\s+(?<default>${rIdentifierWithAs})?\\s*,?\\s*(?<named>{(${rIdentifierWithAsAndType},?\\s*)*})?\\s+from\\s+(?<path>['"][^'"]+['"])\\s*;?`;

const importIdentifierToOptions = (
  identifier: string,
  path: string,
  isDefault: boolean,
  isGlobalTypeOnly: boolean,
): writeImportStatementOptions => {
  const parts = identifier.split(/\s+/).map((part) => part.trim());
  const isTypeOnly = parts[0] === 'type';
  const isAs = parts.length > 2 && parts.includes('as');
  const name = isTypeOnly ? parts[1] : parts[0];
  const as = isAs ? parts[parts.length - 1] : undefined;
  return {
    name,
    path,
    isTypeOnly: isTypeOnly || isGlobalTypeOnly,
    isDefault,
    as,
  };
};

export const transformImportListToOptions = (importList: string[]) => {
  return importList
    .map((statement) => {
      const match = statement.match(importStatementRegex);
      if (!match || !match.groups) {
        throw new Error(`Invalid import statement: ${statement}`);
      }
      const isType = !!match.groups['isType'];
      const defaultImport = match.groups['default']?.trim();
      const namedImports = match.groups['named']?.trim() || '';
      const path = match.groups['path']
        ?.trim()
        .replace(/['"]/g, '')
        .replace(/\.ts$/, '.js');
      const isRelativeImport = path.startsWith('.');
      const importPath = isRelativeImport
        ? path.replace(/['"]/g, '').replace(/\.ts$/, '.js')
        : path.replace(/['"]/g, '');
      const namedImportsList = namedImports
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name.length > 0);
      const defaultImportOptions = defaultImport
        ? [importIdentifierToOptions(defaultImport, importPath, true, isType)]
        : [];
      const namedImportsListOptions = namedImportsList.map((identifier) =>
        importIdentifierToOptions(identifier, importPath, false, isType),
      );

      return [...defaultImportOptions, ...namedImportsListOptions].filter(
        Boolean,
      );
    })
    .flat();
};
