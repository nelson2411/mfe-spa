const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // Match both .js and .mjs files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    // This plugin will generate an HTML5 file that includes all webpack bundles in the body using script tags
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
}
