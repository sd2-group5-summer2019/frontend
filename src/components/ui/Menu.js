import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import "../../index.css";

class Menu extends React.Component{
    render(){
        return(
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
        )
    }
}

export default Menu;