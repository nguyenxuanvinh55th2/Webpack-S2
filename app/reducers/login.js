function login(state =[],action){
  switch (action.type) {
    case 'LOGIN':
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
