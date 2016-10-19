function post(state =[],action){
  switch (action.type) {
    case 'ADD_POST':
      return Object.assign({}, state,{
        listPost:[...state.listPost,action.name]
      })
    default:
      return state
  }
}
export default post
