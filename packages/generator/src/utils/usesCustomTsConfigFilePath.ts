export const usesCustomTsConfigFilePath = async (
  path?: string,
): Promise<void> => {
  if (!path) return;

  const customPath = `${process.cwd()}/${path}`;

  try {
    const tsconfig = await import(customPath);
    if (tsconfig) {
      return console.log(
        '\x1b[33m',
        `"tsconfig.json" loaded from "${customPath}"`,
        '\x1b[37m',
      );
    }
  } catch {
    throw new Error(
      `Could not load "tsconfig.json" from "${customPath}". Please check the path.`,
    );
  }
};
