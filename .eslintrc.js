/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'complexity': ['error', 10],
    'linebreak-style': ['error', 'unix'],
    'max-depth': ['error', 4],
    'max-params': ['error', 4],
    'no-console': ['error'],
    'no-duplicate-imports': [
      'warn',
      {
        includeExports: true,
      },
    ],
    'no-else-return': ['error'],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: false,
      },
    ],
    'no-empty-function': ['error'],
    'no-var': ['error'],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'prefer-template': ['error'],
  },
};
