import React from 'react';
import MenuContainer from '../containers/MenuContainer';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Survey from '../ui/Survey';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateAssignmentC from '../containers/CreateAssignmentC';
import {Redirect} from 'react-router-dom';

class Assignments extends React.Component{
        constructor(props){
            super(props)
		    this.state = {
                assignments:[],
                loading:false,
                form_id:'',
                page:false,
                forms:[]
            }
            this.componentDidMount = this.componentDidMount.bind(this);
            this.changePage = this.changePage.bind(this);
        }

        componentDidMount(){
            let user_id = this.props.user_id

            axios.post(`http://localhost:3001/api/getAllForms`).then(response => {
                
                this.setState({
                    assignments:response.data
                })
                console.log(response.data)
            })
            .catch(function (error){console.log(error)})

            // axios.post(`http://localhost:3001/api/frontendTest`, user_id)
            // .then(response => {
            //     this.setState({
            //         assignments:response.data
            //     })
            //     console.log(response.data)
            // })
            // .catch(function (error){console.log(error)})

        }
        
        changePage(event){
           event.preventDefault();
           console.log(event.target.name)
           this.setState({
               form_id:event.target.name,
               page:true
           })
           
        }
        
    
    // basically I'm thinking on component did mount you 
    // call either all the active assignments for students
    // or if it's an instructor then possibly the active assignments/ but only like
    // the most current
   
    render(){
        const user_type = this.props.userType
        const temp = this.state.assignments
            if(user_type === 'coordinator'){
                return(
                    
                    <Container>
                        <h1 className="header"><center>Assignments</center></h1>
                        <Row>
                            <Col sm={3}> <MenuContainer/> </Col>
                            <Col sm={9}> <CreateAssignmentC/>
                            
                            </Col>
                        </Row>
                    </Container>
                )
            }else if(user_type === 'student' && !this.state.page){
               return(
                  <Container>
                    <h1 className="header"><center>Assignments</center></h1>
                    <Row>
                        <Col sm={3}> <MenuContainer/> </Col>
                        <Col sm={9}>
                             <h1>Current</h1>
		                        <Table  responsive="sm" striped bordered hover variant="dark">
		                        	<thead>
		              		            <tr>
		              			            <th>Title</th>
		              			            <th>Due Date</th>
                                            <th></th>
		              		            </tr>
		               	            </thead>
                                     <tbody>
                                         {temp.map(temp =>
                                            <tr value={temp.form_id} key={temp.title}>
                                            <td>{temp.title}</td>
                                            <td>{temp.complete}</td>
                                            <td> <button name={temp.form_id} onClick={this.changePage}>Take</button></td> 
                                            </tr>
                                        )}
                                     </tbody>
                                 </Table>
                        </Col>
                    </Row>
                </Container>
               )
            }else if(user_type === 'student' && this.state.page ){
                return(
                    <Container>
                        <h1 className="header">Take Survey</h1>
                        <Row>
                            <Col sm={3}> <MenuContainer/> </Col>
                            <Col sm={9}> <Survey flag={"true"} form_id={this.state.form_id} /> </Col>
                        </Row>
                    </Container>
                   
                )
            }else{
                return(<Redirect to='/'/>)
            }
            
                
    }
}
export default Assignments;