import { createAction, handleAction, handleActions } from 'redux-actions';

export function login(name){
  return {
    type: 'LOGIN',
    name
  }
}
