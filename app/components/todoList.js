import React,{ReactDOM} from 'react'
import Todo from './todo.js'
export default class TodoList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "name":""
    }
  }
  render(){

    return (
      <div>
      <input value={this.state.name} onChange={({target})=> this.setState({"name":target.value})}/>
      <button onClick={this.props.addTodo.bind(this, this.state.name)}>Add</button>
      {
        this.props.todo.list.map((value,idx) => <Todo key={idx} name={value}/>)
      }
      </div>

    )
  }
}
