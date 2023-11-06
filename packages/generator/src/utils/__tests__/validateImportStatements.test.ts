import { it, expect } from 'vitest';
import { validateImportStatement } from '../validateImportStatements';

it('should match import statements', () => {
  const match = validateImportStatement(
    `.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"])`,
    'some error location',
  );

  expect(match).toBe(
    `"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"`,
  );
});
