var React = require('react');
var ReactDOM = require('react-dom');
import {Router, Route, IndexRoute} from 'react-router'
import store,{history} from './store'

import App from './components/app'
import {client} from './reducers/index'
import { Provider } from 'react-redux'
import Home from './components/home/Home.jsx';
import './stylesheets/index.scss'
ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'));
