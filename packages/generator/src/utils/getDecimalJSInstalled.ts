export const getDecimalJSInstalled = () => {
  try {
    require.resolve('decimal.js');
    return true;
  } catch {
    return false;
  }
};
