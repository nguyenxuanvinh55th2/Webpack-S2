import { combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'

import ApolloClient,{createNetworkInterface} from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';
import todo from './todo'
import post from './post'
import login from './login'
import addGraphQLSubscriptions from '../addGraphQL.js'
import createApolloClient from '../create-apollo-client';
const wsClient = new Client('ws://localhost:8090');
const networkInterface = createNetworkInterface({ uri: 'http://localhost:8080/graphql' })

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);
export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
})

const rootReducer = combineReducers({
  todo,
  post,
  login,
  routing:routerReducer,
  apollo:client.reducer()
})

export default rootReducer;
