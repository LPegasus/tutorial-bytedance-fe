require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['react-app'],
  rules: {
    'import/no-unresolved': 'off',
    'import/no-webpack-loader-syntax': 'off',
  },
};
