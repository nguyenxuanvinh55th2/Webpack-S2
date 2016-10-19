import React from  'react'
export default class Todo extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    console.log("todo",this.props);
    return (
      <div>
        <p>{this.props.name}</p>
        <button onClick={(e) => this.props.delete()}>Delete</button>
        <button onClick={(e) => this.props.update()}>Update</button>
      </div>
    )
  }
}
