import React from 'react';
import MenuContainer from '../containers/MenuContainer';
import "../../index.css";

import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";

class Assignments extends React.Component{

    
    // basically I'm thinking on component did mount you 
    // call either all the active assignments for students
    // or if it's an instructor then possibly the active assignments/ but only like
    // the most current
   
    render(){

            return(
                <div>
                <h1 className="header">Assignments</h1>
                <MenuContainer/>
                <div>
                    <h3>Active Assignments</h3>
                </div>
              <div>
              <Navbar>
                <Nav>
                    <LinkContainer to="/create_assignment">
                     <NavItem><button>Create Assignment</button></NavItem>
                    </LinkContainer>
                </Nav>
                </Navbar>
              </div>
                  </div>
            )
       
        
        
    }
}
export default Assignments;