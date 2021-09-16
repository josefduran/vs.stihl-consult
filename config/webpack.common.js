const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require('dotenv')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  externals: {
    platform: "vsn_platform",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.(css)$/,
      },
      {
        type: "asset",
        test: /\.(png|svg|jpg|jpeg|gif|ico|otf|woff|woff2|ttf)$/i,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|otf|woff|woff2|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // favicon: "./public/favicon.ico"
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ],
};
