export function removeUseContent(input: string): string {
  let result = '';
  let depth = 0;
  let isInUseBlock = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // If we encounter .use(, we start the depth counting
    if (input.substring(i, i + 5) === '.use(') {
      depth++;
      isInUseBlock = true;
      i += 4; // Skip the '.use(' part
      result += '.use('; // Keep the .use( in the result
      continue;
    }

    // If we are in a .use block, count the depth of brackets
    if (isInUseBlock) {
      if (char === '(') {
        depth++;
      } else if (char === ')') {
        depth--;
        if (depth === 0) {
          isInUseBlock = false;
          result += ')'; // Close the .use() block in the result
        }
      }
      // Skip adding characters to result if inside a .use block
      continue;
    }

    // Add characters to result if outside a .use block
    result += char;
  }

  return result;
}
