const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  const { mode } = env;
  const isProduction = mode === "production";

  const devServer = !isProduction ? {
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: 3000,
    open: true,
  } : undefined;

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve("./build")
    },
    devServer,
    mode,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: ["babel-loader"],
        },
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html"
      }),
      new CleanWebpackPlugin()
    ]
  }
};
