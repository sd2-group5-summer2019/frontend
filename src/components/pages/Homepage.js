import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import "../../index.css";


const Homepage = ({ user_id='', token='', loggedIn=false }) =>{



        const logged = loggedIn

    if(logged){
        return( 
            <div>
               <h1 className="header">Private Homepage</h1>
                    <div className="boxThing">
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
                </div>
            </div>
        )
    } else {
        return(
              <div>
                    <h1 className="header">Public Homepage</h1>
                        <div className="boxThing">
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
                </div>
                   
        )
    }
}

export default Homepage;