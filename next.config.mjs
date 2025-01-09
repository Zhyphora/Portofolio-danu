import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Only run this on client-side builds
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
          chunkFilename: "[id].[contenthash].css",
        })
      );
    }

    return config;
  },
  // Add any other Next.js config options you need
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
