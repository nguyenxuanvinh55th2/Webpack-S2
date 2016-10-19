var path = require('path');
var webpack = require('webpack');

module.exports = {
  context:__dirname + '/app',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    __dirname + '/app/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude:/node_module/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app')
    }]
  }
};
