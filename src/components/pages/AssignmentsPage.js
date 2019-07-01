import React from 'react';
import MenuContainer from '../containers/MenuContainer';
import axios from 'axios';
import "../../index.css";

import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Survey from '../ui/Survey';

class Assignments extends React.Component{
        constructor(props){
            super(props)
		    this.state = {
                assignments:[],
                loading:false,
                form_id:'',
                page:false
            }
            this.componentDidMount = this.componentDidMount.bind(this);
            this.changePage = this.changePage.bind(this);
        }

        componentDidMount(){
            let user_id = this.props.user_id

            axios.post(`http://localhost:3001/api/frontendTest`, user_id)
            .then(response => {
                this.setState({
                    assignments:response.data
                })
                console.log(response.data)
            })
            .catch(function (error){console.log(error)})

        }
        
        changePage(event){
           event.preventDefault();
           
        }
        
    
    // basically I'm thinking on component did mount you 
    // call either all the active assignments for students
    // or if it's an instructor then possibly the active assignments/ but only like
    // the most current
   
    render(){
           const user_type = 'admin'
         const temp = this.state.assignments
            if(user_type === 'admin'){
                return(
                    <div>
                    <h1 className="header">Assignments</h1>

                    <MenuContainer/>
                    
                    <div>
                        <h3>Active Assignments</h3>
                        <ul>
                            <li>
                                Form 2 [VIEW]
                                
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Recently Closed</h3>
                        <ul>
                            <li>Form 1 [GET RESULTS]</li>
                        </ul>
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
            }else if(user_type === 'student'){
               return(
                   <div>
                       <h1 className="header">Assignments</h1>
                        <MenuContainer/>
                        <button id={1} name={2}>Click</button>
                   <div>
                   {temp.map(temp =>
                        <ul key={temp.title}>
                            <li>{temp.title}</li>
                            <li>{temp.complete}</li>
                            <button name={temp.form_id} onClick={this.changePage}>Take</button>
                        </ul>
            )}
                   </div>
                   </div>
               ) 
            }else if(user_type === 'student' && this.page ){
                return(<Survey form_id={this.state.form_id} />)
            }else{
                      return(<p>d</p>)
            }
            
                
    }
}
export default Assignments;