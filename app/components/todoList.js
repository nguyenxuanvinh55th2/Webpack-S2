import React,{ReactDOM} from 'react'
import Todo from './todo.js'
import {graphql} from 'react-apollo'

import { createFragment } from 'apollo-client';

import gql from 'graphql-tag';
export default class TodoList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "name":""
    }
  }
  render(){
    console.log("data",this.props.data);
    return (
      <div>
        <input value={this.state.name} onChange={({target})=> this.setState({"name":target.value})}/>
        <button onClick={this.props.addTodo.bind(this, this.state.name)} >Add Todo</button>
        {
          this.props.todo.list.map((value,idx) => <Todo {...this.props} delete={this.props.deleteTodo.bind(idx)} key={idx} name={value} update={this.props.updateTodo.bind(this,idx,"updateTodo")}/>)
        }
        {/* truyen tham so prop qua con <Todo {...this.props}/> */}
      </div>

    )
  }
}
