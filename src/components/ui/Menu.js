import React from 'react';
import {Redirect} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import "../../index.css";

const logoutHelper = () => {
    return(
        localStorage['redux-store'].clear
       ) 
}

const Menu = ({ userType='', user_id='', token='', loggedIn=false , onLogout}) =>{

        console.log(userType)

     if(loggedIn){
            return(


                
                <Navbar collapseOnSelect bg="light" expand="lg">
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav justify className="flex-column">
                        <ListGroup>
                            <ListGroup.Item action href="/">Dashboard</ListGroup.Item>
                            <ListGroup.Item action href="/assignments">Assignments</ListGroup.Item>
                            <ListGroup.Item action href="/meetings"> Meetings</ListGroup.Item>
                            <ListGroup.Item action href="/project_management_page">Project Management</ListGroup.Item>
                            {userType !== 'student'?
                            <React.Fragment>
                                <ListGroup.Item action href="/"> Analytics</ListGroup.Item>
                                <ListGroup.Item action href="/students"> Students</ListGroup.Item>
                                <ListGroup.Item action href="/teams"> Teams</ListGroup.Item>
                                <ListGroup.Item action href="/sponsors"> Advisors</ListGroup.Item>
                                <ListGroup.Item action href="/sponsors"> Sponsors</ListGroup.Item>
                            </React.Fragment>
                            : 
                            <React.Fragment></React.Fragment>
                        }
                            <ListGroup.Item action href="/settings"> Settings </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" onClick={function(){logoutHelper(); onLogout();}}>Log Out</Button>
                            </ListGroup.Item>

                        </ListGroup>
                </Nav>
                 
                </ Navbar.Collapse>
              </Navbar>
            )
        }
        else if(!loggedIn){
            return(<Redirect to='/'/>)
        }
        else{
            return(<p>Something whent wrong...</p>)
        }
        
}

export default connect()(Menu);