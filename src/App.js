import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import Routes from "./components/Routes";
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
