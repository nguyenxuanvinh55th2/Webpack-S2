import {createStore, combineReduces, compose, applyMiddleware} from 'redux'
import {routerReducer, syncHistoryWithStore} from 'react-router-redux'

import { browserHistory} from 'react-router'

import rootReducer from './reducers/index'
import post from './reducers/post'
const defaultState ={
  login:false
}

const store = createStore(
  rootReducer,
  defaultState,
  compose(
      window.devToolsExtension ? window.devToolsExtension(): f => f
  ));
  if(module.hot){
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    })
  }

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
