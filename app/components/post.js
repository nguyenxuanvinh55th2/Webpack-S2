import React from 'react'
export default class Post extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    console.log(this.props);
    return (
      <button onClick={this.props.addPost.bind(this,"name")}> Add post</button>
    )
  }
}
