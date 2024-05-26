const { merge } = require("webpack-merge")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common.js")
const packageJson = require("../package.json")

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8083/",
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      // This is necessary to make sure the routes work correctly
      index: "/index.html",
    },
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow any origin to access the files
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies, // Share the dependencies from the package.json
    }),
  ],
}

module.exports = merge(commonConfig, devConfig) // Merge the common and dev configs
