import React, { Component, Fragment } from "react";
import {withRouter} from "react-router-dom";
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
    }
  }
  
  render() {

    return (

      <div className="App container yellow">
        <Navbar>
            <Nav>
            <Fragment>

              <LinkContainer to="/login">
              <NavItem> Login (you can click here) </NavItem>
               </LinkContainer>
               <LinkContainer to="/survey">
               <NavItem>SurveyPage(for testing)</NavItem>
              </LinkContainer>
              <LinkContainer to="/register">
               <NavItem>Register(goes to register page now)</NavItem>
              </LinkContainer>
            </Fragment>
            </Nav>
        </Navbar>
              
              
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
