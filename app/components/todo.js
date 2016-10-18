import React from  'react'
export default class Todo extends React.Component {
  render(){
    return (
      <p>{this.props.name}</p>
    )
  }
}
