import React from 'react';
import {Redirect} from 'react-router-dom';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import {connect } from 'react-redux';
import "../../index.css";

const logoutHelper = () => {
    return(
        localStorage['redux-store'].clear
       ) 
}
 
const Menu = ({ userType='', user_id='', token='', loggedIn=false , onLogout}) =>{

        console.log(userType, token)

        if(loggedIn && userType ==='admin'){
            return(
                <div className="menu">
                <Navbar>
                    <Nav>
                        <LinkContainer to="/survey">
                            <NavItem>SurveyPage(for testing)</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/assignments">
                            <NavItem>Assignments</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/get_results">
                            <NavItem>Get Results</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/teams">
                            <NavItem>Teams</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/sponsors">
                            <NavItem>Sponsors</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/students">
                            <NavItem>Students</NavItem>
                        </LinkContainer>
                        <NavItem>
                            <button type="button" onClick={function(){logoutHelper(); onLogout();}}>Log Out</button>
                        </NavItem>
                    </Nav>
                </Navbar>
        </div>
            )
        }else if(loggedIn && userType==='student'){
            return(
                <div className="menu">  
                <Navbar>
                <Nav>
                    <LinkContainer to="/survey">
                        <NavItem>SurveyPage(for testing)</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/assignments">
                        <NavItem>Assignments</NavItem>
                    </LinkContainer>
                    <NavItem>
                        <button type="button" onClick={function(){logoutHelper(); onLogout();}}>Log Out</button>
                    </NavItem>
                </Nav>
            </Navbar>
            </div>
            )
        }
        else if(!loggedIn){
            return(<Redirect to='/login'/>)
        }
        else{
            return(<p>Something whent wrong...</p>)
        }
        
}

export default connect()(Menu);