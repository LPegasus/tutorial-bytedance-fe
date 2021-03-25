/* eslint-disable */
const path = require('path');

module.exports = function () {
  return {
    name: 'playground-theme',

    getThemePath() {
      return path.resolve(__dirname, './theme');
    },

    configureWebpack() {
      return {
        resolve: {
          alias: {
            buble: path.resolve(__dirname, './custom-buble.js'),
          },
        },
      };
    },
  };
};
