function todo( state = [], action){
  switch (action.type) {
  case 'ADD_TODO':
  console.log(action);

    return Object.assign({}, state,{
      list: [
        ...state.list,
        action.name
      ]
    })
  default:
    return state;
  }
}
export default todo;
