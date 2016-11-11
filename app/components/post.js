import React,{ReactDOM} from 'react'
import store from '../store'
import {compose ,graphql} from 'react-apollo'
import gql from 'graphql-tag';
import PostItem from './postItem'
import update from 'react-addons-update';
// const SUBSCRIBE_POST =gql `
//   subscription subPost($author:String) {
//     postUpvoted(author:$author) {
//       _id
//       title
//       author
//       votes
//     }
//   }
// `
class PostList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "votes": null,
      "author":"vinh2"
    }
      this.subscription = null;
  }
  // componentWillReceiveProps(nextProps) {
  //   if (!this.subscription && !nextProps.loading) {
  //     let that = this;
  //     this.subscription = this.props.subscribeToMore({
  //       document: SUBSCRIBE_POST,
  //       variables: { author: this.state.author },
  //       updateQuery: (previousResult, { subscriptionData }) => {
  //         console.log("message",subscriptionData);
  //
  //         const newComment = subscriptionData.data.postUpvoted;
  //           console.log("newComment",newComment);
  //           console.log('previousResult', previousResult);
  //         const newResult = update(previousResult, {
  //             $set: {posts: previousResult.posts.map((item)=>{
  //               if(item._id === newComment._id) return newComment;
  //               return item;
  //             })},
  //         });
  //         console.log("newResult",newResult);
  //
  //         return newResult;
  //       },
  //     });
  //   }
  // }
  renderPost(){
    if(this.props.loading || !this.props.posts)
      return (<div>loading</div>)
    else {
      console.log(this.props.posts);

      return (<div style={{display:"flex",padding:'10px'}} >
        {this.props.posts.map((post,idx)=><PostItem {...this.props} key={idx} index={idx} post={post}></PostItem>)}
      </div>)
    }
  }
  render(){
    console.log("data",this.props.posts);
    return (
      <div >
        {this.renderPost()}
        <div>
          <button style={{position:"fixed" ,  bottom:"15px" , right:"25px" }} className="btn btn-default" data-toggle="modal" data-target="#myModal"><span className="pficon-add-circle-o"></span></button>

          <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                    <span className="pficon pficon-close"></span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">Thêm bài viết mới</h4>
                </div>
                <div className="modal-body">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label className="col-sm-3 control-label" htmlFor="textInput-modal-markup">Tiêu đề</label>
                      <div className="col-sm-9">
                        <input type="text" id="textInput-modal-markup" className="form-control"/></div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label" htmlFor="textInput2-modal-markup">Mô tả</label>
                      <div className="col-sm-9">
                        <input type="text" id="textInput2-modal-markup" className="form-control"/></div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label" htmlFor="textInput3-modal-markup">Link hình ảnh</label>
                      <div className="col-sm-9">
                        <input type="text" id="textInput3-modal-markup" className="form-control"/>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
const GET_POST = gql`
  query getPost($userId:String) {
    posts(userId:$userId) {
      _id
      caption
      likes
      display_src
      comments {
        _id
        text
        userId
        user {
          _id
          address
        }
      }
  }
  }
`
const mapdataPost = graphql(
  GET_POST,
  {
    options:{variables:{userId:"aXbY62cox9MiF4vAN"}},
    props: ({ ownProps, data: { loading, posts, refetch ,subscribeToMore} }) => ({
     postLoading: loading,
     posts: posts,
     refetchPost: refetch,
     subscribeToMore:subscribeToMore
   }),
  }
)
// const UPDATE_VOTE_POST = gql`
//   mutation update($postId:String,$vote:Int){
//     upvotePost(postId:$postId,vote:$vote) {
//       _id
//       title
//       author
//       votes
//     }
//   }
// `
// const mutationUpdateVote = graphql(UPDATE_VOTE_POST,
// {
//   props: ({ mutate }) => ({
//     updatePost: (postId,vote) => mutate({ variables: { postId,vote } }),
//   }),
// })

export default compose(
mapdataPost,
)(PostList)
