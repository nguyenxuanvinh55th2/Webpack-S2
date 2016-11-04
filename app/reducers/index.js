import { combineReducers} from 'redux'
import { routerReducer} from 'react-router-redux'

import ApolloClient,{createNetworkInterface} from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';
import todo from './todo'
import post from './post'
import login from './login'
import addGraphQLSubscriptions from '../addGraphQL.js'
const wsClient = new Client('ws://localhost:3000');
//
// const networkInterface = createNetworkInterface({
//   uri: '/graphql',
//   opts: {
//     credentials: 'same-origin',
//   },
//   transportBatching: true,
// });
const networkInterface = createNetworkInterface('http://localhost:3000/graphql')


//
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions( networkInterface,wsClient);

//cu
// export const client = new ApolloClient({
//   networkInterface: networkInterfaceWithSubscriptions
// });

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

const rootReducer = combineReducers({
  todo,
  post,
  login,
  routing:routerReducer,
  apollo:client.reducer()
})

export default rootReducer;
