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
      "names": [],
      "votes": null
    }
      this.subscription = null;
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
  componentWillReceiveProps(nextProps) {
    // if (!this.subscription && !nextProps.loading) {
    //   this.subscription = this.props.subscribeToMore({
    //     document: SUBSCRIPTION_QUERY,
    //     updateQuery: (previousResult, { subscriptionData }) => {
    //       const newComment = subscriptionData.data.postUpvoted;
    //       // if it's our own mutation, we might get the subscription result
    //       // after the mutation result.
    //       console.log(newComment);
    //       return newComment;
    //     },
    //   });
    // }
  }
  render(){
    console.log("data",this.props);
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




        {/* cu */}
        {/* <div onClick={this.onClick.bind(this)}>Click me</div>
          <input value={this.state.name} onChange={({target})=> this.setState({"name":target.value})}/>
          <button onClick={this.props.addTodo.bind(this, this.state.name)} >Add Todo</button>
          {
          this.state.names.map((value,idx) => <Todo {...this.props} delete={this.props.deleteTodo.bind(idx)} key={idx} name={value.name} update={this.props.updateTodo.bind(this,idx,"updateTodo")}/>)
        } */}
        {/* truyen tham so prop qua con <Todo {...this.props}/> */}
      </div>

    )
  }
}
const GET_POST = gql`
  query getPost {
      posts {
      title
      author
      votes
    }
  }
`
const mapdataPost = graphql(
  GET_POST,
  {
    props: ({ ownProps, data: { loading, posts, refetch ,subscribeToMore} }) => ({
     postLoading: loading,
     posts: posts,
     refetchPost: refetch,
     subscribeToMore:subscribeToMore
   }),
  }
)
const SUBSCRIBE_POST =gql `
  subscription subPost {
    postUpvoted {
      title
      author
      votes
    }
  }
`
export default compose(
mapdataPost
)(TodoList)
