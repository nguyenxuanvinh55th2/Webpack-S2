import React,{ReactDOM} from 'react'
import Todo from './todo.js'

import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
class TodoList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "name":"",
      "names": []
    }
  }
  onClick() {
    // this.props.mutate()
    //   .then(({ data }) => {
    //     console.log('got data', data);
    //   })
    let parent = this
    this.props.submit(this.state.name).then(({data}) => {
      console.log(data);
      parent.setState({"names": data.addTask});
    })
  }

  render(){
    console.log("state",this.state.names);
    // console.log("data",this.props);
    return (
      <div>

      <div onClick={this.onClick.bind(this)}>Click me</div>
        <input value={this.state.name} onChange={({target})=> this.setState({"name":target.value})}/>
        <button onClick={this.props.addTodo.bind(this, this.state.name)} >Add Todo</button>
        {
          this.state.names.map((value,idx) => <Todo {...this.props} delete={this.props.deleteTodo.bind(idx)} key={idx} name={value.name} update={this.props.updateTodo.bind(this,idx,"updateTodo")}/>)
        }
        {/* truyen tham so prop qua con <Todo {...this.props}/> */}
      </div>

    )
  }
}

const SUBJECT = gql`
  query loadtam($userId: String) {
    hello(userId:$userId) {
    name
  }
  }
`;

const submitRepository = gql`
  mutation submitRepository($name:String) {
    addTask(name:$name) {
      name
    }
  }
`;

const valuePass = 'nguyen xuan vinh 55th2'
const mapDataToProps = graphql(
  SUBJECT,
  {
    options: () => ({ variables: { userId: valuePass}, pollInterval: 20000  })
  }
);
const mutation = graphql(submitRepository,
{
  props: ({ mutate }) => ({
    submit: (name) => mutate({ variables: { name } }),
  }),
})
// const TodoList = mapDataToProps(TodoList)
export default TodoList =mutation(TodoList)
