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

                <Navbar bg="light" expand="lg">
                  <Nav className="mr-auto">
                    <NavDropdown title="Menu" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/assignments">Assignments</NavDropdown.Item>

                        {userType !== 'student'?
                            <React.Fragment>
                                
                                <NavDropdown.Item href="/">Analytics</NavDropdown.Item>
                                <NavDropdown.Item href="/students">Students</NavDropdown.Item>
                                <NavDropdown.Item href="/teams">Teams</NavDropdown.Item>
                                <NavDropdown.Item href="/sponsors">Advisors</NavDropdown.Item>
                                <NavDropdown.Item href="/sponsors">Sponsors</NavDropdown.Item>
                            </React.Fragment>
                            : 
                            <React.Fragment></React.Fragment>
                        }
                     
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                        <NavDropdown.Item>
                            <Button type="button" onClick={function(){logoutHelper(); onLogout();}}>Log Out</Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <h1 className="mr-auto"><center>Homepage</center></h1>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                  </Form>
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