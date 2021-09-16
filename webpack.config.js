// Copyright 2021 Spectrio, All Rights Reserved.
// Spectrio CONFIDENTIAL

var path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var GitRevisionPlugin = require("git-revision-webpack-plugin");
var VersionFile = require("webpack-version-file");
var webpack = require("webpack");

var assetsPath = __dirname + "/dist/assets";
var loadersPath = __dirname + "/loaders";
var gitRevisionPlugin  = new GitRevisionPlugin();

module.exports = {
    entry: {
        home: "./src/home/js/main",
        "parts-finder": "./src/parts-finder/js/main",
        "product-catalog": "./src/product-catalog/js/main",
        "product-registration": "./src/product-registration/js/main",
        "video-gallery": "./src/video-gallery/js/main"
    },
    externals: {
    platform: "vsn_platform",
    },
    module: {
        loaders: [
            {
                test: require.resolve("jquery"),
                loader: "expose?$"
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?|mp3|png|jpg|gif)$/,
                loader: "file-loader"
            },
            {
                test: /\.(csv|txt)$/,
                loader: "raw-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    output: {
        path: assetsPath,
        filename: "[name].js",
        publicPath: "assets/",
        sourceMapFilename: "[name].js.map"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VersionFile({
            templateString: "<%= name %>@<%= version %>\nBuild date: <%= buildDate %>\nCommit: <%= branch %> <%= commit %>",
            data: {
                date: new Date(),
                commit: gitRevisionPlugin.commithash(),
                branch: gitRevisionPlugin.branch()
            },
            output: path.join(assetsPath, "../version.txt")
        })
    ],
    resolveLoader: {
        "alias": {
            "preload-image-loader": loadersPath + "/preload-image-loader"
        }
    },
    resolve: {
        extensions: ["", ".js", ".css", ".scss"],
        modulesDirectories: ["src", "node_modules"]
    }
};