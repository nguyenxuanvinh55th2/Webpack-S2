import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreator from "../action/actionCreator"
import React from 'react'
function mapStateToProps(state){
  return {
      todo:state.todo,
      post:state.post
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(actionCreator, dispatch);
}

class Main extends React.Component {
  render(){
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

const App = connect (mapStateToProps,mapDispathToProps)(Main);

export default App;
