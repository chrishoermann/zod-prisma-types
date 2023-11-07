import { it, expect } from 'vitest';

import { removeUseContent } from '../removeUseContent';

it('should remove .use() content from a string', () => {
  const inputString =
    '.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))})).array()...';
  const resultString = removeUseContent(inputString);

  expect(resultString).toBe('.use().array()...');
});
