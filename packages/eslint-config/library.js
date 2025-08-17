/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:node/recommended',
    'eslint-config-turbo',
  ],
  plugins: ['prettier'],
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': ['error', { js: 'ignorePackages' }],
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)'],
    },
  ],
};
