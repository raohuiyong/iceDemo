const { tslint, deepmerge } = require('@ice/spec');

module.exports = deepmerge(tslint, {
  rules: {
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'prefer-object-spread': 0,
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0
  }
});
