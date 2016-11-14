import { createAction, handleAction, handleActions } from 'redux-actions';
import { asteroid } from '../asteroid.js'

export function addTodo(name){
  return {
    type: 'ADD_TODO',
    name
  }
}

//action xử lý việc đăng nhập của user thông qua facebook
//---------------------------------------------------------------------------------//
export const loginFB = createAction('LOGINFB', (userInfo) => {
asteroid.call("loginFbGgUser", userInfo).then(result => {
      console.log(result);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
  })
  .catch(error => {
      console.log("Error");
      console.error(error);
  });
return userInfo;
});

//action xử lý việc đăng nhập của user thông qua google
//---------------------------------------------------------------------------------//
export const loginGG = createAction('LOGINGG', (userInfo) => {
asteroid.call("loginFbGgUser", userInfo).then(result => {
      console.log(result);
      localStorage.setItem("userInfo", JSON.stringify(result));
  })
  .catch(error => {
      console.log("Error");
      console.error(error);
  });
return userInfo;
});

//action xử lý việc đăng xuất của user
//---------------------------------------------------------------------------------//
export const logout = createAction('LOGOUT', () => {
  localStorage.removeItem("userInfo");
  return {};
});
