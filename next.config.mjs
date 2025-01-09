// next.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    // Add the mini-css-extract-plugin only for client-side builds
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash].css",
          chunkFilename: "static/css/[id].[contenthash].css",
        })
      );
    }

    return config;
  },
};
