module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2021,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'playwright/no-networkidle': 'warn', // Allow networkidle in BasePage for now
  },
  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.test.ts'],
      rules: {
        // Playwright-specific rules for test files
      },
    },
  ],
  ignorePatterns: [
    'node_modules/**',
    'playwright-report/**',
    'test-results/**',
    '.ai/**',
    'dist/**',
    '.eslintrc.js',
  ],
};
