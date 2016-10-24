import {createClass} from "asteroid";
import store from "./store"
const Asteroid = createClass();
// Connect to a Meteor backend
export const asteroid = new Asteroid({
    endpoint: "ws://localhost:3000/websocket"
});

asteroid.on("loggedIn",(userId)=>{
  console.log("loggedIn",userId);
  store.dispatch({ type: 'LOGIN' })
  }
)

asteroid.on("loggedOut",()=>{
  console.log("loggedOut");
  store.dispatch({type:'LOGOUT'})
  }
)
