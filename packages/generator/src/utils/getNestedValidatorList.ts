// GET NESTED VALIDATOR LIST
// ----------------------------------------------

/**
 * Extracts a list of validator patterns from a given validator string. The function identifies
 * distinct validators based on specific delimiters like periods and parentheses.
 *
 * For example, given a string like `.method1(arg).method2()`, it would return
 * [`.method1(arg)`, `.method2()`].
 *
 * @param {string} validatorPattern - The input string containing a sequence of validator patterns.
 * @returns {string[]} An array of individual validator patterns extracted from the input string.
 */
export const getNestedValidatorList = (validatorPattern: string) => {
  const splitIndices = getSplitIndices(validatorPattern);
  return getPatternListFromSplitIndices(validatorPattern, splitIndices);
};

// GET SPLIT INDICES
// ----------------------------------------------

export const getSplitIndices = (string: string) => {
  const splitIndices = [0];
  let depth = 0;

  [...string].forEach((char, idx) => {
    if (!depth && !isWordChar(char)) {
      const splitPosition = string.substring(0, idx).match(/\.\w+$/)?.index;
      if (splitPosition) splitIndices.push(splitPosition);
    }

    if (char === '(') depth++;
    if (char === ')') depth--;
  });

  return splitIndices;
};

// GET PATTERN LIST FROM SPLIT INDICES
// ----------------------------------------------

export const getPatternListFromSplitIndices = (
  validatorPattern: string,
  splitIndices: number[],
) => {
  const patternList: string[] = [];

  for (let i = 0; i < splitIndices.length; i++) {
    const start = splitIndices[i];
    const end = splitIndices[i + 1] ?? validatorPattern.length;
    patternList.push(validatorPattern.substring(start, end).trimEnd());
  }

  return patternList;
};

// HELPERS
// ----------------------------------------------

export const isWordChar = (char: string) => {
  return /[\w]/.test(char);
};
