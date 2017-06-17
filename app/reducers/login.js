import store from "../store"
function login(state =[],action){
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({},{
        isLogin:true
      })
    default:
      return state
  }
}
export default login
