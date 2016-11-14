import React, { PropTypes, Component } from 'react'
import { Link, Router, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
//import Notification from '../notification/notification.js'

class UserImage extends Component {
  render() {
    return (
      <div className='form-group' style={{marginLeft: '20px'}}>
        <button className="btn btn-default header-button" onClick={e =>{
            document.getElementById('userMenu').style.display = 'inline';
          }}>
          <img id='userButton' className="login-image" src={ this.props.userImage } />
        </button>
      </div>
    )
  }
}

UserImage.PropTypes = {
  userImage: PropTypes.string.isRequired,
}

class NoteNotificate extends Component {
  render() {
    if(!this.props.show) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className="noteNotificate">{ this.props.number }</div>
      )
    }
  }
}

NoteNotificate.PropTypes = {
  show: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
}

class UserMenu extends Component {
  render() {
    return (
      <div id="userMenu">
        <div className="row" style={{marginBottom: '18px'}} onClick={e => {
            document.getElementById('userMenu').style.display = 'inline';
          }}>
          <div className="col-md-5">
              <img style={{width: '80px', height: '80px'}} src={ this.props.image }></img>
          </div>
          <div className="col-md-7">
              <h4 style={{width: '100%'}}><b>{ this.props.name }</b></h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <Link to={"/profile/" + this.props.userId + "/wall" } className="btn btn-success" onClick={e => {
                document.getElementById('userMenu').style.display = 'none';
              }}>
              Trang cá nhân
            </Link>
          </div>
          <div className="col-md-5">
            <button className="btn btn-primary" onClick={e => {
                this.props.onLogout();
                document.getElementById('userMenu').style.display = 'none';
                browserHistory.push('/');
              }}>Đăng xuất</button>
          </div>
        </div>
      </div>
    )
  }
}

UserMenu.PropTypes = {
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

const buttonStyle = {
  backgroundColor: 'inherit',
  backgroundImage: 'url("")',
  border: 'none',
  marginLeft: '20px'
}

const fontStyle = {
  fontSize: '16px',
  color: 'white'
}

export default class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {reRender: false};

      // parent = this;
      // Meteor.setTimeout(function(){
      //    parent.setState({
      //      rerender: true
      //    });
      // }, 1000);

      parent = this;
      this.keyWord = {
        value: null
      };
  }

  renderNotificateIcon(){
    var number = 0;
    var show = false;
    if(this.props.data && !this.props.data.loading) {
      number = this.props.data.notification.filter(note => !note.read).length;
      if(number > 0)
        show = true
    }
    return (<NoteNotificate show={ show } number={ number }/>)
  }

  render() {
      let userId = '';
      let name = '';
      let image = '';
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
      if(userInfo) {
        userId = userInfo._id;
        name = userInfo.profileObj? userInfo.profileObj.name : userInfo.name;
        image = userInfo.profileObj? userInfo.profileObj.imageUrl : userInfo.picture.data.url;
      }
      return (
        <div style={{width:'100%'}}>
          <div style={{width:'100%'}} className="header">
            {/*<Notification/> */}
            <UserMenu image={ image } name={ name } userId={ userId } onLogout={ this.props.onLogout }/>
            <form className="row" style={{width:'100%'}} onSubmit ={e => {
                e.preventDefault();
                let keyWord = ReactDOM.findDOMNode(this.keyWord).value;
                this.props.search(keyWord);
                browserHistory.push('/search/' + keyWord);
              }}>

              <div className="col-md-1">
                <Link to="/" className="btn btn-default" style={buttonStyle}>
                  <span style={fontStyle}>Home</span>
                </Link>
              </div>

              <div className="col-md-1">
                <Link to="/" className="btn btn-default" style={buttonStyle}>
                  <span style={fontStyle}>Something</span>
                </Link>
              </div>

              <div className="col-md-5"  style={{width: '60%', marginLeft: '20px'}}>
                <div className="input-group" style={{width: '100%', marginTop: '5px'}}>
                  <input className="form-control" type="text" ref={node => this.keyWord=node}/>
                  <span className="input-group-addon glyphicon glyphicon-search" style={{width: '20px'}}></span>
                </div>
              </div>

              <div className="col-md-1" style={{marginLeft: '20px'}}>
                <button id="notificationButton" className="btn btn-default" style={{backgroundColor: 'inherit', backgroundImage: 'url("")', border: 'none',}}
                  onClick = {e => {
                    document.getElementById('notification').style.display = 'inline'
                }}>
                  { this.renderNotificateIcon() }
                  <span style={fontStyle}>Thông báo</span>
                </button>
              </div>

              { localStorage.getItem("userInfo") ? <UserImage userImage={image}/> : null }

            </form>
          </div>
        </div>
      )
    }
}

Header.PropTypes = {
  data: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
}
