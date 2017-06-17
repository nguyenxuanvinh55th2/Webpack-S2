const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    ],
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: "/node_modules",
            use: ['babel-loader'],
            include: path.join(__dirname, "app")
          },
          { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
          { test: /\.scss/i, use: ['style-loader', 'sass-loader'] }
        ]
    }
};
module.exports = config;
