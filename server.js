var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var path = require('path');
var express =require('express')

var {apolloExpress, graphiqlExpress} =require('apollo-server');
var { makeExecutableSchema } = require('graphql-tools');

var bodyParser =require('body-parser')

var typeDefs = require('./app/api/schema')
var resolvers = require('./app/api/resolvers')

const app = express();

var schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/graphql', bodyParser.json(), apolloExpress({ schema: schema }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

 new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}).listen(4000, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('App listening at http://localhost:4000/');
});

app.listen(4001, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Graphql listening at http://localhost:4000/graphiql');
});
