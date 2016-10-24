import React from 'react'

import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import {asteroid} from '../asteroid'
class FormRegister extends React.Component {
  constructor(props) {
      super(props)
      this.state={"email":' ',"pass":' '}
  }
  onClickRegister(){
    asteroid.loginWithPassword({email:this.state.email,password:this.state.pass}).then((res) => {
      let localToken = localStorage.getItem("ws://localhost:3000/websocket__login_token__");
      if(localToken){
        localStorage.setItem('Meteor.loginToken',localToken);
      }
      //toggleLogin(false);
    }).catch((err) => {console.log(err);})

    // this.props.submitRegister(this.state.email,this.state.pass).then((data) => console.log(data))
  }
  onLogout(){
    asteroid.logout()
  }
  render(){
    console.log(this.props);
    return(
      <div>
        <p>{this.props.isLogin}</p>
        <input value={this.state.email} onChange={({target}) => this.setState({"email":target.value})}/>
        <input value={this.state.pass} onChange={({target}) => this.setState({"pass":target.value})}/>
        <button onClick={this.onClickRegister.bind(this)}>Login</button>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}

const REGISTER = gql`
mutation register($email:String, $pass:String){
  addRegister(email: $email, pass: $pass)
}
`;

const mutation = graphql(REGISTER,
{
  props: ({ mutate }) => ({
    submitRegister: (email,pass) => mutate({ variables: { email,pass } }),
  }),
})


const Register = mutation(FormRegister)
export default Register
