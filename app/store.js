import {createStore, combineReduces, compose, applyMiddleware} from 'redux'
import {routerReducer, syncHistoryWithStore} from 'react-router-redux'

import { browserHistory} from 'react-router'

import rootReducer from './reducers/index'
const defaultState ={
  todo:{
    list:[]
  }
}
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  defaultState,
  compose(
      window.devToolsExtension ? window.devToolsExtension(): f => f
  ));
  if(module.hot){
    console.log("hot reload module");
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    })
  }

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
