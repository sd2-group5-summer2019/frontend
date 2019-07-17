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
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Meeting from '../ui/Meeting';
//access_level, title, user_id, description, team_id, start_date, end_date
//{title:'test', description:'agenda', start_date:'start', end_date:'end', completed:'false'}
//[{form_id:'10', title:'test', description:'agenda', start_date:'start', end_date:'end', is_complete:false}]
//                                

class MeetingsPage extends React.Component{
        constructor(props){
            super(props)
		    this.state = {
                meetings:[],
                loading:false,
                instance_id:'',
                title:'',
                description:'',
                is_complete:'',
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
            this.meetingsTable = this.meetingsTable.bind(this);
        }


        // loads different things depending on user type
        // for students a list of current uncompleted assignments
        // for instructors all the assignments they've created 
        // right now it only loads all the assignments user_id not being used
        // in the API endpont i cobbled together
        componentDidMount(){

            const payload = {
                user_id:'4'
            }

            axios.post(`http://localhost:3001/api/getInstances`, payload).then(response => {
                const meetings = [];
                for(var i = 0; i < response.data.length; i++) {
                    if(response.data[i].type === 'meeting')
                        meetings.push(response.data[i])
                }
                this.setState({
                    meetings:meetings
                })
                console.log(response.data)
            })
            .catch(function (error){console.log(error)})

            this.meetingsTable()

        }
        
        changePage(event){
           event.preventDefault();
           const res = event.target
           console.log(res.title)

           this.setState({
               title:res.title,
               description:res.name,
               instance_id:res.id,
               is_complete:res.value,
               page:true
           })           
        }

        // populates the assignments table depending on the
        // type of user
        meetingsTable(){
            const user = 'coordinator'
            const tableText = this.state.tableE

            if(user === 'student'){
                tableText.title = 'Current Meetings'
                tableText.th1 = 'Due Date'
                tableText.btn_text = 'Begin'
            }else if(user === 'coordinator'){
                tableText.title = 'Meetings'
                tableText.th1 = 'Status'
            }
                this.setState({
                    tableE:tableText
                })
        }

        
 

     
    
    // basically I'm thinking on component did mount you 
    // call either all the active assignments for students
    // or if it's an instructor then possibly the active assignments/ but only like
    // the most current
   
    render(){
        const user = 'coordinator'
        const tableText = this.state.tableE
        
        if(!this.state.page){
               return(
                  <Container>
                    <Row className="text-center"> <h1>Meetings</h1></Row>
                    <Row>
                        <Col sm={3}> <MenuContainer/> </Col>
                        <Col sm={9}>
                        <LinkContainer to="/create_meeting">
                            <NavItem>Create New Meeting</NavItem>
                        </LinkContainer>
		                    <Table  responsive="sm" striped bordered hover variant="dark">
		                        <thead>
		              		        <tr>
		              			        <th>{tableText.title}</th>
		              			        <th>{tableText.th1}</th>
                                        <th>{tableText.th2}</th>
		              		        </tr>
		               	        </thead>
                                 <tbody>
                                     {this.state.meetings.map(meeting =>
                                        <tr value={meeting.form_id} key={meeting.instance_id}>
                                            <td>{meeting.title}</td>
                                            <td>{user !== 'coordinator' ? meeting.end_date: meeting.is_complete ? 'Completed' : 'Not Started' }</td>
                                            <td> <button title={meeting.title} name={meeting.description} id={meeting.instance_id} value={meeting.is_complete} onClick={this.changePage}>{meeting.is_complete ? 'View Results':'Begin'}</button></td> 
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
                            <Col sm={9}> <Meeting flag={"true"} form_id={this.state.form_id} /> </Col>
                        </Row>
                    </Container>
                )
            }else if(user==='coordinator' && this.state.page){
                if(this.state.is_complete){
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <Meeting flag={"true"} instance_id={this.state.instance_id} title={this.state.title} description={this.state.description} /> </Col>
                            </Row>
                        </Container>
                    )
                }
                else{
                  return(
                    <Container>
                         <Row className="text-center"> <h1>View Results</h1></Row>
                        <Row>
                            <Col sm={3}> <MenuContainer/> </Col>
                            <Col sm={9}> <Get_Results flag={"true"} instance_id={this.state.instance_id} form_id={this.state.form_id}/> </Col>
                        </Row>
                    </Container>
                )  
                }
            }else{
                return(<Redirect to='/'/>)
            }           
    }
}
export default MeetingsPage;