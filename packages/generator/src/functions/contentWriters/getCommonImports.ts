import { writeImportStatementOptions } from 'src/classes';
import { GeneratorConfig } from 'src/schemas';

export function getCommonArgImports({
  useExactOptionalPropertyTypes,
  prismaClientPath,
  inputTypePath,
}: Pick<
  GeneratorConfig,
  'useExactOptionalPropertyTypes' | 'prismaClientPath' | 'inputTypePath'
>) {
  const imports: writeImportStatementOptions[] = [];
  imports.push({ name: 'z', path: 'zod' });
  imports.push({ name: 'Prisma', path: prismaClientPath, isTypeOnly: true });
  if (useExactOptionalPropertyTypes) {
    imports.push({
      name: 'ru',
      path: `../${inputTypePath}/RemoveUndefined`,
      isDefault: true,
    });
  }
  return imports;
}
