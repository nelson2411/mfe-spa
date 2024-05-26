const { merge } = require("webpack-merge")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require("./webpack.common.js")
const packageJson = require("../package.json")

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      // This is necessary to make sure the routes work correctly
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      shared: packageJson.dependencies, // Share the dependencies from the package.json
    }),
  ],
}

module.exports = merge(commonConfig, devConfig) // Merge the common and dev configs
