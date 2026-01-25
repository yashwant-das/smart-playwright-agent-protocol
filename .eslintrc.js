module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsdoc'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    "jsdoc/require-jsdoc": ["error", { "require": { "FunctionDeclaration": true, "MethodDefinition": true }, "contexts": ["PropertyDefinition"] }],
    "jsdoc/check-tag-names": ["error", { "definedTags": ["selector", "strategy", "verified", "reason"] }],
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.property.name='locator']",
        "message": "❌ VIOLATION: Raw page.locator() is FORBIDDEN. Use Page Objects."
      }
    ]
  },
  overrides: [
    { "files": ["pages/**/*.ts"], "rules": { "no-restricted-syntax": "off" } }
  ]
};
