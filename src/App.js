import React, { Component, Fragment } from "react";
import {withRouter, Redirect} from "react-router-dom";
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
      loggedIn:false
    }
  }
  
  render() {
   
   
      return ( <Routes />
     )
    
    
  }
}

export default withRouter(App);
