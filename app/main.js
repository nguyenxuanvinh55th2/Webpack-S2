var React = require('react');
var ReactDOM = require('react-dom');
import {Router, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import TodoList from './components/todoList.js'
import store,{history} from './store'
import App from './components/app'
import PostList from './components/post'
import Todo from './components/todo'
import Register from './components/register'
import {client} from './reducers/index'
import { ApolloProvider } from 'react-apollo';

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PostList}/>
        <Route path="/register" component={Register}/>
      </Route>
    </Router>
  </ApolloProvider>
, document.getElementById('root'));
