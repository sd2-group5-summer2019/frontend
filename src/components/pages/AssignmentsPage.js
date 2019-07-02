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
import Get_Results from '../ui/Get_Results';

class Assignments extends React.Component{
        constructor(props){
            super(props)
		    this.state = {
                assignments:[],
                loading:false,
                form_id:'',
                page:false,
                tableE:[
                    {title:''},
                    {th1:''},
                    {th2:''},
                    {btn_text:''}
                ] //array of elements for the table
            }
            this.componentDidMount = this.componentDidMount.bind(this);
            this.changePage = this.changePage.bind(this);
            this.assignmentsTable = this.assignmentsTable.bind(this);
        }


        // loads different things depending on user type
        // for students a list of current uncompleted assignments
        // for instructors all the assignments they've created 
        // right now it only loads all the assignments user_id not being used
        // in the API endpont i cobbled together
        componentDidMount(){

            let user_id = this.props.user_id

            axios.post(`http://localhost:3001/api/getAllForms`).then(response => {
                
                this.setState({
                    assignments:response.data
                })
                console.log(response.data)
            })
            .catch(function (error){console.log(error)})

            this.assignmentsTable()
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

        // populates the assignments table depending on the
        // type of user
        assignmentsTable(){
            const user = this.props.userType
            const tableText = this.state.tableE

            if(user === 'student'){
                tableText.title = 'Current Assignments'
                tableText.th1 = 'Due Date'
                tableText.btn_text = 'Take'
            }else if(user === 'coordinator'){
                tableText.title = 'Assignments'
                tableText.th1 = 'Active'
                tableText.btn_text = 'View Results'
            }
                this.setState({
                    tableE:tableText
                })
        }

        newAssignment(){

        }
        
 

     
    
    // basically I'm thinking on component did mount you 
    // call either all the active assignments for students
    // or if it's an instructor then possibly the active assignments/ but only like
    // the most current
   
    render(){
        const user = this.props.userType
        const temp = this.state.assignments
        const tableText = this.state.tableE
        
        if(!this.state.page){
               return(
                  <Container>
                    <Row className="text-center"> <h1>Assignments</h1></Row>
                    <Row>
                        <Col sm={3}> <MenuContainer/> </Col>
                        <Col sm={9}>
		                    <Table  responsive="sm" striped bordered hover variant="dark">
		                        <thead>
		              		        <tr>
		              			        <th>{tableText.title}</th>
		              			        <th>{tableText.th1}</th>
                                        <th>{tableText.th2}</th>
		              		        </tr>
		               	        </thead>
                                 <tbody>
                                     {temp.map(temp =>
                                        <tr value={temp.form_id} key={temp.title}>
                                            <td>{temp.title}</td>
                                            <td>{user !== 'coordinator' ? temp.end_date: temp.completed}</td>
                                            <td> <button name={temp.form_id} onClick={this.changePage}>{tableText.btn_text}</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>
                        </Col>
                    </Row>
                </Container>
               )
            }else if(user==='student' && this.state.page){
                return(
                    <Container>
                         <Row className="text-center"> <h1>Take Assignment</h1></Row>
                        <Row>
                            <Col sm={3}> <MenuContainer/> </Col>
                            <Col sm={9}> <Survey flag={"true"} form_id={this.state.form_id} /> </Col>
                        </Row>
                    </Container>
                )
            }else if(user==='coordinator' && this.state.page){
                    return(
                        <Container>
                             <Row className="text-center"> <h1>View Results</h1></Row>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <Get_Results flag={"true"} form_id={this.state.form_id} /> </Col>
                            </Row>
                        </Container>
                    )  
            }else{
                return(<Redirect to='/'/>)
            }           
    }
}
export default Assignments;