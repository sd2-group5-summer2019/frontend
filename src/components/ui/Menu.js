import React from 'react';
import {Redirect} from 'react-router-dom';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import {connect } from 'react-redux';
import "../../index.css";

const Menu = ({ type='public', user_id='', token='', loggedIn=false , onLogout}) =>{


        if(loggedIn && type==='admin'){
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
                        <LinkContainer to="/courses">
                            <NavItem>Courses</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/groups">
                            <NavItem>Groups(for testing)</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/students">
                            <NavItem>Students(for testing)</NavItem>
                        </LinkContainer>
                        <NavItem>
                            <button type="button" onClick={onLogout}>Log Out</button>
                        </NavItem>
                    </Nav>
                </Navbar>
        </div>
            )
        }else if(loggedIn && type==='student'){
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
                        <button type="button" onClick={onLogout}>Log Out</button>
                    </NavItem>
                </Nav>
            </Navbar>
            </div>
            )
        }
        else{
            return(<p>Unauthorized</p>)
        }
        
}

export default connect()(Menu);