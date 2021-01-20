module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.tsx?$/,
      },
      use: [
        {
          loader: "@svgr/webpack",
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
