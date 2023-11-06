import { it, expect } from 'vitest';
import { transformImportStringToList } from '../transformImportStringToList';

it('should match import statements', () => {
  const match = transformImportStringToList(
    `"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"`,
  );

  expect(match).toEqual([
    `import { myFunction } from '../../../../utils/myFunction';`,
    `import { myFunction } from '../../../../utils/myOtherFunction';`,
  ]);
});
