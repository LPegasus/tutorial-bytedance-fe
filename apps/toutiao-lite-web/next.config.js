const path = require('path');

module.exports = {
  webpack(config) {
    config.module.rules.unshift({
      test: /\.tsx?$/,
      exclude: /[\\/]node_modules[\\/]/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            logLevel: 'info',
            projectReferences: true,
            experimentalFileCaching: true,
            configFile: path.resolve(__dirname, 'tsconfig.json'),
            compilerOptions: {
              noUnusedLocals: false,
            },
            happyPackMode: true,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.tsx?$/,
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            titleProp: true,
            ref: true,
            svgoConfig: {
              plugins: [
                {
                  removeDimensions: false,
                },
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};
