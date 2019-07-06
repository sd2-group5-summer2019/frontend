import React from 'react';
import MenuContainer from '../containers/MenuContainer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginContainer from '../containers/LoginContainer';


const Homepage = ({ user_id='', token='', loggedIn=false }) =>{

        const logged = loggedIn

    if(logged){
        return( 
            <MenuContainer />
        )
    } else {
        return( <LoginContainer/> )
    }
}

export default Homepage;