module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['standard-with-typescript'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-void': 0, // is incompatible with @typescript-eslint/no-floating-promises - void is used to ignore promises
    'no-case-declarations': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/promise-function-async': 0,
    '@typescript-eslint/no-base-to-string': 0, // Doesn't play well with ObjectID.toString
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-dynamic-delete': 0,
    '@typescript-eslint/indent': 0, // rule is broken, see https://github.com/typescript-eslint/typescript-eslint/issues/1824
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/explicit-function-return-type': 0,

    '@typescript-eslint/prefer-nullish-coalescing': [
      'error', {
        ignoreConditionalTests: true
      }
    ]
  }
}
