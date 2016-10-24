export function addTodo(name){
  return {
    type: 'ADD_TODO',
    name
  }
}

export function deleteTodo(id){
  return {
    type: 'DELETE_TODO',
    id
  }
}

export function updateTodo(id,name){
  return {
    type: 'UPDATE_TODO',
    id,
    name
  }
}

export function addPost(name){
  return {
    type: 'ADD_POST',
    name
  }
}

export function login(){
  return {
    type:'LOGIN'
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}
