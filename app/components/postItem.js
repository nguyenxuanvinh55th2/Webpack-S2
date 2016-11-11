import React from  'react'
export default class PostItem extends React.Component {
  constructor(props){
    super(props)
    this.state={"vote":''}
  }
  render(){
    // console.log("todo",this.props);

    return (
      <div style={{ marginRight:"20px",width: "33%",boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',transition:'0.3s'}}>
        <img src={this.props.post.display_src} alt="Avartar" style={{width:'100%'}}></img>
        <div style={{padding:'2px 16px'}}>
          <h4>{this.props.post.caption}</h4>
          <div style={{display:"flex",justifyContent: "space-between"}}>
            <button className="btn btn-lg " type="button">Likes  {this.props.post.likes}</button>
            <button className="btn btn-lg " type="button">Comments {this.props.post.comments.length}</button>
          </div>
        </div>
      </div>
    )
  }
}
