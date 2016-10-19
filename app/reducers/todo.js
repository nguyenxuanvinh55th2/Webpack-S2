function todo( state = [], action){
  switch (action.type) {
  case 'ADD_TODO':
    return Object.assign({}, state,{
      list: [
        ...state.list,
        action.name
      ]
    })
  case 'DELETE_TODO':
    return Object.assign({}, state,{
      list:state.list.slice(1, action.id)
    })
  case 'UPDATE_TODO':
  console.log(state.list);
    state.list[action.id]=action.name
    return Object.assign({}, state, {
      list:state.list
    })
  default:
    return state;
  }
}
export default todo;
