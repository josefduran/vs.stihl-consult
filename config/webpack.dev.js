const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const dotenv = require('dotenv')


/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: "development",
  devServer: {
    port: 3007,
    contentBase: path.join(__dirname, "public"),
    open: true,
    hot: true,
    historyApiFallback: { index: "/", disableDotRule: true },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|otf|woff|woff2|ttf)$/i,
        type: 'asset/resource',
      }
    ],
  },
  target: "web",
  plugins: [
    new HotModuleReplacementPlugin(), 
    new ReactRefreshWebpackPlugin(),    
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DefinePlugin({
    'process.env': JSON.stringify(dotenv.config().parsed)
  })],
  devtool: "eval-source-map",
};

module.exports = merge(common, devConfig);
