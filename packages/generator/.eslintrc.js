/* global __dirname */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectService: { allowDefaultProject: ['*.config.ts'] },
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint-config-universe',
    'prettier',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['node_modules', 'dist'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/order': 'off',
    '@typescript-eslint/no-deprecated': 'warn',
  },

  overrides: [
    {
      files: ['*.js', '**/*.test.ts', '**/__tests__/**/*.ts'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      parserOptions: { projectService: false },
    },
  ],
};
