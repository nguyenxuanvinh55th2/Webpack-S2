import React from  'react'
export default class PostItem extends React.Component {
  constructor(props){
    super(props)
    this.state={"vote":''}
  }
  render(){
    // console.log("todo",this.props);

    return (
      <div>
        <hr></hr>
        <p>{this.props.post.titile} {this.props.post.author} {this.props.post.votes}</p>
        <div>
          <input value={this.state.vote} onChange={({target})=> this.setState({"vote":target.value})}></input>
          <button onClick={(e)=>this.props.updatePost(this.props.post._id,this.state.vote)}>updatePost</button>
        </div>
      </div>
    )
  }
}
