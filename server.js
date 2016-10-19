const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const path = require('path');
const express =require('express')

const {apolloExpress, graphiqlExpress} =require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const bodyParser =require('body-parser')

const typeDefs = require('./app/api/schema')
const resolvers = require('./app/api/resolvers')

const app = express();

const schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/graphql', bodyParser.json(), apolloExpress({ schema: schema }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4001, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Graphql listening at http://localhost:4001/graphiql');
});
