import React from  'react'
import {compose ,graphql} from 'react-apollo'
import gql from 'graphql-tag';
class PostItem extends React.Component {
  constructor(props){
    super(props)

  }
  render(){
    return (
      <div style={{float: "left", margin:"10px",minWidth: "30%",maxWidth:"31%",boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',transition:'0.3s'}}>
        <img src={this.props.post.display_src} alt="Avartar" style={{width:'100%'}}></img>
        <div style={{padding:'2px 16px'}}>
          <h4>{this.props.post.caption}</h4>
          <div style={{display:"flex",justifyContent: "space-between"}}>
            <button className="btn btn-lg " type="button"  onClick={(e)=>this.props.updateLike(this.props.post._id)} >Likes {this.props.post.likes}</button>
            <button className="btn btn-lg " type="button">Comments {this.props.post.comments.length}</button>
          </div>
        </div>
      </div>
    )
  }
}

const UPDATE_LIKE_POST =gql`
  mutation updateLikePost($postId:String){
    updateLikePost(postId:$postId)
  }
`
const updatelikePost = graphql(UPDATE_LIKE_POST,
{
  props:({mutate})=> ({
    updateLike :(id) => mutate({variables:{postId:id}})
  })
});
export default compose(
  updatelikePost
)(PostItem)
