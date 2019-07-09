import React from 'react';
import MenuContainer from '../containers/MenuContainer';
import LoginContainer from '../containers/LoginContainer';
import { Container, Row, Col } from 'react-bootstrap';


const Dash = ({user_id ='', token=''}) => {

    return(
        <Container>
            <Row>
                <Col sm={3}></Col>
                <Col >
                    <h1>Dash</h1>

                </Col>
            </Row>
        </Container>
    )

}
const Homepage = ({ user_id='', token='', loggedIn=false }) =>{

        const logged = loggedIn

    if(logged){
        return( 
           <div>
                <MenuContainer />
                    <Dash />
           </div>
        )
    } else {
        return( <LoginContainer/> )
    }
}

export default Homepage;