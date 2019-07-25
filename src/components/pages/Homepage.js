import React from 'react';
import MenuContainer from '../containers/MenuContainer';
import LoginContainer from '../containers/LoginContainer';
import { Container, Row, Col } from 'react-bootstrap';
import { InstructorDashContainer } from '../containers/GeneralContainer';



const Homepage = ({ user_id='', userType='', token='', loggedIn=false }) =>{

    const logged = loggedIn

    console.log(userType)

    if(logged && userType === 'student'){
        return( 
            <Container>
                <Row><Col><br></br></Col></Row>
                <Row>
                    <Col style={{padding:"5px", margin:"0px"}} sm={3}> <MenuContainer /></Col>
                    <Col sm={9} ></Col>
                </Row>
            </Container>
        )
    }else if(logged && userType !== 'student') {
        return(
            <Container>
                <Row><Col><br></br></Col></Row>
                <Row>
                    <Col style={{padding:"5px", margin:"0px"}} sm={3}> <MenuContainer /></Col>
                    <Col sm={9} ><InstructorDashContainer /></Col>
                </Row>
            </Container>
        )
    
    } else {
        return( 
            <Container>
                <Row><br></br></Row>
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={4}><LoginContainer/> </Col>
                    <Col sm={4}></Col>
                </Row>
            </Container>
            
        )
    }
}

export default Homepage;