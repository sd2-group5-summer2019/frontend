import React from 'react';
import MenuContainer from '../containers/MenuContainer';
import LoginContainer from '../containers/LoginContainer';
import { Container, Row, Col } from 'react-bootstrap';


const Dash = ({user_id ='', token=''}) => {

    return(
        <Container>
            
            <Row>
                <Col style={{padding:"5px", margin:"0px"}} sm={3}> <MenuContainer /></Col>
                <Col sm={9} > <h1>Dashboard</h1></Col>
            </Row>
        </Container>
    )

}
const Homepage = ({ user_id='', token='', loggedIn=false }) =>{

        const logged = loggedIn

    if(logged){
        return( <Dash />)
    } else {
        return( <LoginContainer/> )
    }
}

export default Homepage;