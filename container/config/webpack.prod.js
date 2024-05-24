const { merge } = require("webpack-merge")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common")
const packageJson = require("../package.json")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // contenthash is used to cache the file
    publicPath: "/container/latest/", // This is the path where the files will be available
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container", // This is not strictly necessary, but it's a good practice to set it
      remotes: {
        // The key is the name of the remote, the value is the name of the remote and the path to the remoteEntry file
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, prodConfig)
