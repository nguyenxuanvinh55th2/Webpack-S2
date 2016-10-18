var React = require('react');
var ReactDOM = require('react-dom');
import {Router, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import TodoList from './components/todoList.js'
import store,{history} from './store'
import App from './components/app'
ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={TodoList}/>
      </Route>
  </Router>
  </Provider>
, document.getElementById('root'));
