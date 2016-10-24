import { combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'

import ApolloClient,{createNetworkInterface} from 'apollo-client';
import todo from './todo'
import post from './post'
import login from './login'
export const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:3000/graphql')
});

const rootReducer = combineReducers({
  todo,
  post,
  login,
  routing:routerReducer,
  apollo:client.reducer()
})

export default rootReducer;
