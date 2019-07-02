import React from 'react';
import {Redirect} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// import "../../index.css";

const logoutHelper = () => {
    return(
        localStorage['redux-store'].clear
       ) 
}

const Menu = ({ userType='', user_id='', token='', loggedIn=false , onLogout}) =>{

        console.log(userType)

        if(loggedIn && userType === 'coordinator'){
            return(
                <Nav justify fill className="flex">                
                    <ListGroup>
                         <ListGroup.Item action href="/"> Dashboard </ListGroup.Item>
                        <ListGroup.Item action href="/assignments"> Assignments </ListGroup.Item>
                        <ListGroup.Item action href="/get_results"> Results </ListGroup.Item>
                        <ListGroup.Item action href="/teams"> Teams </ListGroup.Item>
                        <ListGroup.Item action href="/students"> Students </ListGroup.Item>
                        <ListGroup.Item action href="/sponsors"> Sponsors </ListGroup.Item>
                        <ListGroup.Item action href="/survey"> SurveyPage (temporary) </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" onClick={function(){logoutHelper(); onLogout();}}>Log Out</Button>
                        </ListGroup.Item>
                    </ListGroup>
                 </Nav>
     
            )
        }else if(loggedIn && userType === 'student'){
            return(
                <Nav fill className="flex">                
                    <ListGroup>
                        <ListGroup.Item action href="/"> Dashboard </ListGroup.Item>
                        <ListGroup.Item action href="/assignments"> Assignments </ListGroup.Item>
                        <ListGroup.Item action href="/survey"> SurveyPage (temporary) </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" onClick={function(){logoutHelper(); onLogout();}}>Log Out</Button>
                        </ListGroup.Item>
                    </ListGroup>
                 </Nav>
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