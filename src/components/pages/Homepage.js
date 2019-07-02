import React from 'react';
import "../../index.css";
import MenuContainer from '../containers/MenuContainer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginContainer from '../containers/LoginContainer';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

const Homepage = ({ user_id='', token='', loggedIn=false }) =>{

        const logged = loggedIn

    if(logged){
        return( 
            
            <Container>
                <h1 className="header"> <center> Dashboard </center></h1>
                <Row>
                    <Col sm={3}> <MenuContainer /> </Col>
                    <Col sm={6}> </Col>
                    <Col sm={3}>
                        <Navbar>
                             <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-info">Search</Button> 
                            </Form>
                        </Navbar>
                   </Col>
                </Row>
            </Container>
             
           
        )
    } else {
        return( <LoginContainer/> )
    }
}

export default Homepage;