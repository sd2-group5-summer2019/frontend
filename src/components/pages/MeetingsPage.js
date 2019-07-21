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
                start_date:'',
                form_id:'',
                page:false
            }
            this.componentDidMount = this.componentDidMount.bind(this);
            this.changePage = this.changePage.bind(this);
        }

        componentDidMount(){
            let user_id = this.props.user_id
            console.log(user_id)
            const payload = {
                user_id:user_id
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
        }
        
        changePage(event){
           event.preventDefault();
           const res = event.target

           console.log(res)

           this.setState({
               title:res.title,
               description:res.name,
               instance_id: res.id,
               is_complete: res.value === "0" ? false : true,
               start_date: res.data,
               page:true
           })           
        }
   
    render(){

        if(!this.state.page){
               return(
                  <Container>
                    <Row className="text-center"> <h1>Meetings</h1></Row>
                    <Row><MenuContainer/></Row>
                    <Row>
                        <Col sm={3}>  </Col>
                        <Col sm={9}>
                        <LinkContainer to="/create_meeting">
                            <NavItem>Create New Meeting</NavItem>
                        </LinkContainer>
		                    <Table  responsive="sm" striped bordered hover>
		                        <thead>
		              		        <tr>
		              			        <th>Title</th>
		              			        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
		              		        </tr>
		               	        </thead>
                                 <tbody>
                                     {this.state.meetings.map(meeting =>
                                        <tr value={meeting.form_id} key={meeting.instance_id}>
                                            <td>{meeting.title}</td>
                                            <td>{meeting.start_date}</td>
                                            <td>{meeting.is_complete ? 'Completed' : 'Not Started' }</td>
                                            <td> <button title={meeting.title} name={meeting.description} id={meeting.instance_id} value={meeting.is_complete} data={meeting.start_date} onClick={this.changePage}>{meeting.is_complete ? 'View Results':'Begin'}</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>
                        </Col>
                    </Row>
                </Container>
               )

            }else if(this.state.page){
                if(!this.state.is_complete){
                    console.log(this.state.is_complete)
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <Meeting flag={"true"} instance_id={this.state.instance_id} title={this.state.title} description={this.state.description} /> </Col>
                            </Row>
                        </Container>
                    )
                }
                else {
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}>  
                                    <h2>Meeting Results for {this.state.title} on {this.state.start_date}</h2>
                                    <h3>Agenda</h3>
                                    <p>{this.state.description}</p>
                                    Attendance Information Here
                                </Col>
                            </Row>
                        </Container>
                    )                }
            }else{
                return(<Redirect to='/'/>)
            }           
    }
}
export default MeetingsPage;