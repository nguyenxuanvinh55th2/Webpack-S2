import React,{ReactDOM} from 'react'
import store from '../store'
import {compose ,graphql} from 'react-apollo'
import gql from 'graphql-tag';
import PostItem from './postItem'
import update from 'react-addons-update';
const SUBSCRIBE_POST =gql `
  subscription subPost {
    postUpvoted {
      _id
      title
      author
      votes
    }
  }
`
class PostList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "votes": null
    }
      this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.loading) {
      this.subscription = this.props.subscribeToMore({
        document: SUBSCRIBE_POST,
        variables: {  },
        updateQuery: (previousResult, { subscriptionData }) => {
          console.log("message",subscriptionData);

          const newComment = subscriptionData.data.postUpvoted;
            console.log("newComment",newComment);
            console.log('previousResult', previousResult);
          const newResult = update(previousResult, {
              $set: {posts: previousResult.posts.map((item)=>{
                if(item._id === newComment._id) return newComment;
                return item;
              })},
          });
          console.log("newResult",newResult);

          return newResult;
        },
      });
    }
  }
  renderPost(){
    if(this.props.loading || !this.props.posts)
      return (<div>loading</div>)
    else {
      return (<div>
        {this.props.posts.map((post,idx)=><PostItem {...this.props} key={idx} index={idx} post={post}></PostItem>)}
      </div>)
    }
  }
  render(){
    console.log("data",this.props);
    return (
      <div>
        {this.renderPost()}
      </div>

    )
  }
}
const GET_POST = gql`
  query getPost {
      posts {
        _id
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
const UPDATE_VOTE_POST = gql`
  mutation update($postId:String,$vote:Int){
    upvotePost(postId:$postId,vote:$vote) {
      _id
      title
      author
      votes
    }
  }
`
const mutationUpdateVote = graphql(UPDATE_VOTE_POST,
{
  props: ({ mutate }) => ({
    updatePost: (postId,vote) => mutate({ variables: { postId,vote } }),
  }),
})

export default compose(
mapdataPost,
mutationUpdateVote
)(PostList)
