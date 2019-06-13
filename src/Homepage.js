import React from 'react';
import {withRouter, Redirect} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Routes from "./Routes";

class Homepage extends React.Component{

    state={
        loggedIn:false
    }
    render(){

        const logged = this.state.loggedIn
        if(logged){
          return( <div>
               <h1>Private Homepage</h1>
               <Navbar>
                  <Nav>
                     <LinkContainer to="/survey">
                     <NavItem>SurveyPage(for testing)</NavItem>
                    </LinkContainer>
                    
                  </Nav>
              </Navbar>
           </div>)
        } else {
            return(
                 

              <div className="App container yellow">
                  <h1>Public Homepage</h1>
          <Navbar>
              <Nav>
              <React.Fragment>
  
                <LinkContainer to="/login">
                <NavItem> Login (you can click here) </NavItem>
                 </LinkContainer>
                <LinkContainer to="/register">
                 <NavItem>Register(goes to register page now)</NavItem>
                </LinkContainer>
              </React.Fragment>
              </Nav>
          </Navbar>
                
                
         
        </div>
                   
            )
        }
    }
}

export default Homepage;