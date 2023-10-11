module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb", "airbnb/hooks",
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'linebreak-style': 0,
    'no-console': 0,
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-restricted-globals': 0,
  },
}
