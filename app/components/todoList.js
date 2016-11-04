import React,{ReactDOM} from 'react'
import Todo from './todo.js'
import store from '../store'
import {compose ,graphql} from 'react-apollo'
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
    //   })s
    let parent = this
    this.props.submit(this.state.name).then(({data}) => {
      console.log(data);
      parent.setState({"names": data.addTask});
    })
  }
  render(){
    console.log("data",this.props.data);
    //thay doi variables graphql
    // console.log("data",this.props.data.variables.user);
    // this.props.data.variables.user = "nguyen xuan vinh"

    // console.log("state0",store.getState().post.listPost)
    // store.getState().post.listPost = ["nguyen xuan vinh"]
    // console.log("state1",store.getState().post.listPost)
    // store.getState().post.listPost = ["changeState"]
    // console.log("state1",store.getState().post.listPost)
    //   console.log("data",this.props.data.variables.user);
    // console.log("localStorage",localStorage.getItem("Meteor.loginToken"));
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
  query loadtam($user:String) {
    hello(user:$user) {
    name
  }
  }
`;

const mapDataToProps = graphql(
  SUBJECT
);
// option: ({name}) => ({variables:{user:name}})
const submitRepository = gql`
  mutation submitRepository($name:String) {
    addTask(name:$name) {
      name
    }
  }
`;

const mutation = graphql(submitRepository,
{
  props: ({ mutate }) => ({
    submit: (name) => mutate({ variables: { name } }),
  }),
})
// const TodoList = mapDataToProps(TodoList)
// export default TodoList =mutation(TodoList)
const SUBSCRIPTION_QUERY = gql`
  subscription scoreUpdates {
    showTast
  }
`;

export default compose(
  mutation,
  mapDataToProps
)(TodoList)
