import React from 'react';
import "../../index.css";
import MenuContainer from '../containers/MenuContainer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginContainer from '../containers/LoginContainer';

const Homepage = ({ user_id='', token='', loggedIn=false }) =>{

        const logged = loggedIn

    if(logged){
        return( 
            
            <Container>
                <h1 className="header"> <center> Dashboard </center></h1>
            
                <Row>
                    <Col sm={3}> <MenuContainer /> </Col>
                    <Col sm={9}> </Col>
                </Row>
            </Container>
             
           
        )
    } else {
        return( <LoginContainer/> )
    }
}

export default Homepage;