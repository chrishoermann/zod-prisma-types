export const getDecimalJSInstalled = () => {
  try {
    require.resolve('decimal.js');
    return true;
  } catch (_e) {
    return false;
  }
};
