import { it, expect } from 'vitest';
import { transformImportStringToSet } from '../transformImportStringToSet';

it('should match import statements', () => {
  const match = transformImportStringToSet(
    `"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"`,
  );

  expect(match).toEqual([
    `import { myFunction } from '../../../../utils/myFunction';`,
    `import { myFunction } from '../../../../utils/myOtherFunction';`,
  ]);
});
