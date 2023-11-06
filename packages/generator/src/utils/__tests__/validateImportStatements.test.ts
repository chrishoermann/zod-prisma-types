import { it, expect } from 'vitest';
import { validateImportStatements } from '../validateImportStatements';

it('should match import statements', () => {
  const match = validateImportStatements(
    `.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myOtherFunction";"])`,
    'some error location',
  );
});
