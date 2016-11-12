import React,{ReactDOM} from 'react'
import store from '../store'
import {compose ,graphql} from 'react-apollo'
import gql from 'graphql-tag';
import PostItem from './postItem'
import update from 'react-addons-update';
const SUBSCRIBE_POST =gql `
  subscription subscriptPost {
    subscriptPost {
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
class PostList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      caption:" ",
      link:" "
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if(!this.subscription && !nextProps.loading){
      this.subscription = this.props.subscribeToMore({
        document:SUBSCRIBE_POST,
        variables:{},
        updateQuery :(previousResult,{subscriptionData}) =>{
          let newPost = subscriptionData.data.subscriptPost;
          let newResult = previousResult;
          newResult.posts.forEach(item => {
            if(item._id === newPost._id)
              if(item.likes !== newPost.likes)
                item.likes = newPost.likes
          })
          return newResult;
        }
      })
    }
  }
  insertPost(event){
    event.preventDefault();
    this.props.insertPost(this.state.caption,this.state.link);
    this.setState({caption:" "});
    this.setState({link:" "})
    this.props.refetchPost();
  }
  renderPost(){
    if(this.props.loading || !this.props.posts)
      return (<div  className="spinner spinner-lg"></div>)
    else {
      return (<div style={{padding:'10px'}} >
        {this.props.posts.map((post,idx)=><PostItem {...this.props} key={idx} index={idx} post={post}></PostItem>)}
      </div>)
    }
  }
  render(){
    // console.log("data",this.props);
    return (
      <div >
        {this.renderPost()}
        <div >
          <button style={{position:"fixed" ,  bottom:"15px" , right:"25px" }} className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModalAddPost"><span className="pficon-add-circle-o"></span></button>
          <div className="modal fade" id="myModalAddPost" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                      <label className="col-sm-3 control-label" htmlFor="textInput2-modal-markup">Mô tả</label>
                      <div className="col-sm-9">
                        <input type="text" value={this.state.caption} onChange={({target})=>this.setState({caption:target.value})} className="form-control"/></div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label" htmlFor="textInput3-modal-markup">Link hình ảnh</label>
                      <div className="col-sm-9">
                        <input type="text" id="textInput3-modal-markup" value={this.state.link} onChange={({target})=>this.setState({link:target.value})}  className="form-control"/>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.insertPost.bind(this)}>Save</button>
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
const ADD_POST = gql`
  mutation insertPost($caption:String,$display_src:String){
    insertPost(caption:$caption,display_src:$display_src)
  }
`
const insertPost = graphql(ADD_POST,
  {
    props:({mutate})=>({
      insertPost : (caption,display_src) =>mutate({variables:{caption,display_src}})
    })
  }
);
export default compose(
  mapdataPost,
  insertPost
)(PostList)
