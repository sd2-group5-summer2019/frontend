import React, { Component, Fragment } from "react";
import {Link, withRouter} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props)

    this.state={
      username:'',
      token:'',
      isLoggedIn:false
    }
  }
  
  userLoggedIn = loggedIn =>
  {
    this.setState({isLoggedIn:loggedIn})
  }

  userLogOut = event =>{
    this.userLoggedIn(false)
    this.props.history.push("/login")
  }
  render() {

    const childProps = {
      isLoggedIn:this.state.isLoggedIn,
      userLoggedIn:this.userLoggedIn
    }
    return (

      <div className="App container yellow">
        <Navbar>
            <Nav>
            {this.state.isLoggedIn ? 
            <NavItem onClick={this.userLogOut}>Log Out</NavItem> 
            :
                <Fragment>

               <LinkContainer to="/login">
              <NavItem> Login </NavItem>
               </LinkContainer>
               <LinkContainer to="/survey">
               <NavItem>Register</NavItem>
              </LinkContainer>

                </Fragment>
            }
            </Nav>
        </Navbar>
              
              
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
