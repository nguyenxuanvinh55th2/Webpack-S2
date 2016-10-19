import React,{ReactDOM} from 'react'
import Todo from './todo.js'

import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
class TodoList extends React.Component {
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

const SUBJECT = gql`
  query loadtam {
    hello {
    name
  }
  }
`;
const mapDataToProps = graphql(
  SUBJECT,
  {
    options: () => ({  pollInterval: 1000 })
  }
);
// const TodoList = mapDataToProps(TodoList)
export default TodoList =mapDataToProps(TodoList)
