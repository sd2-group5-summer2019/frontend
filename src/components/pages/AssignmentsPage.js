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
import Button from 'react-bootstrap/Button';
import CreateInstance from '../ui/CreateInstance';

class Assignments extends React.Component{
        constructor(props){
            super(props)
		    this.state = {
                assignments:[],
                loading:false,
                form_id:'',
                page:false,
                pageCode:0,
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
            this.newAssignment = this.newAssignment.bind(this);
        }


        // loads different things depending on user type
        // for students a list of current uncompleted assignments
        // for instructors all the assignments they've created 
        // right now it only loads all the assignments user_id not being used
        // in the API endpont i cobbled together
        componentDidMount(){

            let user_id = this.props.user_id
            console.log(user_id)
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
           const page = this.state.pageCode
           const user = this.props.userType
           const next_page = event.target.id
           console.log(event.target.id)

           if(user === 'student'){
            this.setState({
                pageCode:1
            })
           }else if(user !== 'student' && next_page === 'newAssignment')
           {
                this.setState({
                    pageCode:3
                })
           }
           else if(user !== 'student' && next_page === 'results')
           {
                   
                this.setState({
                     form_id:event.target.name,
                    pageCode:2
                })
           }
           else if(user !== 'student' && next_page === 'assign')
           {
                this.setState({
                     form_id:event.target.name,
                    pageCode:4
                })
           }
        
           
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
                tableText.th1 = ''
                tableText.btn_text = 'Results'
            }
                this.setState({
                    tableE:tableText
                })
        }

        newAssignment(){
            this.setState({
                page:true,
                newAssignment:true
            })
        }
        
 

     
    
    // basically I'm thinking on component did mount you 
    // call either all the active assignments for students
    // or if it's an instructor then possibly the active assignments/ but only like
    // the most current
   
    render(){
        const user = this.props.userType
        const temp = this.state.assignments
        const tableText = this.state.tableE
        const page = this.state.pageCode

        if(page === 0){
               return(
                <div>
                <MenuContainer pageTitle="Assignments"/> 
                  <Container>
                    <Row>
                        <Col sm={3}> 
                            {user === 'coordinator' ? <Button type="button" size="lg" id='newAssignment' onClick={this.changePage}>New Assignment</Button> : ''} 
                        </Col>
                        <Col sm={9}>
		                    <Table  responsive="sm" striped bordered hover>
		                        <thead>
		              		        <tr>
		              			        <th>{tableText.title}</th>
		              			        <th>{tableText.th1}</th>
                                         <th> </th> 
		              		        </tr>
		               	        </thead>
                                 <tbody>
                                     {temp.map(temp =>
                                        <tr value={temp.form_id} key={temp.form_id}>
                                            <td>{temp.title}</td>
                                            <td>{user === 'student' ? temp.end_date : <Button variant="success" id='assign' size="lg" type="button" name={temp.form_id} onClick={this.changePage}>Assign</ Button>}</td>
                                            <td> <Button type="button" id='results' size="lg" name={temp.form_id} onClick={this.changePage}>{tableText.btn_text}</Button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>
                        </Col>
                    </Row>
                </Container>

                </div>
               )
            }else if(page === 1){
                return(
                    <Container>
                        <Row><MenuContainer/></Row>
                         <Row className="text-center"> <h1>Take Assignment</h1></Row>
                        <Row>
                            <Col sm={3}>  </Col>
                            <Col sm={9}> <Survey flag={"true"} form_id={this.state.form_id} /> </Col>
                        </Row>
                    </Container>
                )
            }else if(page === 2){
                    return(
                       <div>
                           <MenuContainer/> 
                        <Container>
                             <Row className="text-center"> <h1>View Results</h1></Row>
                            <Row>
                                <Col sm={3}> </Col>
                                <Col sm={9}> <Get_Results flag={"true"} form_id={this.state.form_id} /> </Col>
                            </Row>
                        </Container>
                        </div>
                    )  
            }else if(page === 3){
                return(
                   <div>
                       <MenuContainer/> 
                        <Container>
                        <Row>
                            <Col sm={3}> </Col>
                            <Col sm={9}> <CreateAssignmentC /> </Col>
                        </Row>
                    </Container>
                   </div>
                ) 
                }else if(page === 4){
                   return(
                    <div>
                    <MenuContainer/> 
                        <Container>
                            <Row>
                            <Col sm={3}> </Col>
                            <Col sm={9}> <CreateInstance form_id={this.state.form_id} /> </Col>
                            </Row>
                        </Container>
                     </div>
                   )
                }else{
                return(<Redirect to='/'/>)
            }           
    }
}
export default Assignments;