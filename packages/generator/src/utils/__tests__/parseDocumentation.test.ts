import { it, expect } from 'vitest';

import { ENUM_LIST_FILTER, parseDocumentation } from '../parseDocumentation';

it('should parse a simple comment', () => {
  expect(parseDocumentation('hello')).toEqual({
    writeListFilter: false,
  });
});

it(`should parse '${ENUM_LIST_FILTER} from a comment`, () => {
  expect(parseDocumentation(`my String with ${ENUM_LIST_FILTER}`)).toEqual({
    writeListFilter: true,
  });
});
