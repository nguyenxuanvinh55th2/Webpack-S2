import store from "../store"
function login(state =[],action){
  switch (action.type) {
    case 'LOGIN':
      // console.log("action",action.userId)
      // console.log("state0",store.getState().post.listPost)
      // store.getState().post.listPost = ["nguyen xuan vinh"]
      // console.log("state1",store.getState().post.listPost)
      return Object.assign({},{
        isLogin:true
      })
      case 'LOGOUT':
        return Object.assign({},{
          isLogin:false
        })
    default:
      return state
  }
}
export default login
