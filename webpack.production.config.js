const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
var config = {
    context: __dirname + "/app",
    devtool: 'eval',
    entry: {
        app: __dirname + "/app/main.js"
    },
    devServer: {
        hot: true,
        contentBase: __dirname,
        port: 4000,
        host: '0.0.0.0',
        historyApiFallback: true,
        disableHostCheck: true
    },
    output: {
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        path: __dirname + "/dist",
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'utility'],
            minChunks: Infinity,
            filename: '[name].[hash].js',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({ // define where to save the file
          filename: 'bundle.css',
          allChunks: true,
          disable: process.env.NODE_ENV !== 'production'
          })
    ],
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: "/node_modules",
            use: ['babel-loader'],
            include: path.join(__dirname, "app")
          },
          { // regular css files
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({
                loader: 'css-loader?importLoaders=1',
              }),
            },
            {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader']
              })
            }
        ]
    }
};
module.exports = config;
