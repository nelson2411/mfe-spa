const { merge } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common.js")
const packageJson = require("../package.json")

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      // This is necessary to make sure the routes work correctly
      index: "index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies, // Share the dependencies from the package.json
    }),
  ],
}

module.exports = merge(commonConfig, devConfig) // Merge the common and dev configs
