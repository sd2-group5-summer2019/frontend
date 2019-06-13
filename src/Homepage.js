import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import "./App.css";

class Homepage extends React.Component{

    state={
        loggedIn:true
    }
    render(){

        const logged = this.state.loggedIn
        if(logged){
          return( <div className="yellow">
               <h1>Private Homepage</h1>
               <Navbar>
                  <Nav>
                     <LinkContainer to="/survey">
                     <NavItem>SurveyPage(for testing)</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/assignments">
                     <NavItem>Assignments</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/courses">
                     <NavItem>Courses</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/groups">
                     <NavItem>Groups(for testing)</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/students">
                     <NavItem>Students(for testing)</NavItem>
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