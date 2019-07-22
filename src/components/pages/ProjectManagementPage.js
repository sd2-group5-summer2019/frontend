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
import Task from '../ui/Task';
//access_level, title, user_id, description, team_id, start_date, end_date
//{title:'test', description:'agenda', start_date:'start', end_date:'end', completed:'false'}
//[{form_id:'10', title:'test', description:'agenda', start_date:'start', end_date:'end', is_complete:false}]                            

class ProjectManagementPage extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                milestones:[],
                tasks:[],
                loading:false,
                instance_id:'',
                title:'',
                description:'',
                is_complete:'',
                end_date:'',
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
                const milestones = [];
                const tasks = [];
                for(var i = 0; i < response.data.length; i++) {
                    if(response.data[i].type === 'milestone')
                        milestones.push(response.data[i])
                    if(response.data[i].type === 'task') {
                        tasks.push(response.data[i])
                    }
                }
                this.setState({
                    milestones:milestones,
                    tasks:tasks
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
               instance_id: res.id,
               is_complete: res.value === "0" ? false : true,
               page:true
           })           
        }
   
    render(){
        if(!this.state.page){
               return(
                  <Container>
                    <Row className="text-center"> <h1>Project Management</h1></Row>
                    <Row>
                        <Col sm={3}><MenuContainer/></Col>
                        <Col sm={9}>
                        <LinkContainer to="/create_task">
                            <NavItem>Create a New Task or Milestone</NavItem>
                        </LinkContainer>
                        <h2>Tasks</h2>
                            <Table  responsive="sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Assigned To</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                 <tbody>
                                     {this.state.tasks.map(task =>
                                        <tr key={task.task_id}>
                                            <td>{task.title}</td>
                                            <td>{task.end_date}</td>
                                            <td>{task.is_complete ? 'Completed' : 'Not Started' }</td>
                                            <td> <button id={task.task_id} value={task.is_complete} onClick={this.changePage}>{task.is_complete ? 'View Task Summary':'Turn in Task'}</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>
                        <h2>Milestones</h2>
                            <Table  responsive="sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                 <tbody>
                                     {this.state.milestones.map(milestone =>
                                        <tr key={milestone.instance_id}>
                                            <td>{milestone.title}</td>
                                            <td>{milestone.end_date}</td>
                                            <td>{milestone.is_complete ? 'Completed' : 'Not Started' }</td>
                                            <td> <button id={milestone.task_id} value={milestone.is_complete} onClick={this.changePage}>{milestone.is_complete ? 'View Milestone Summary':'Turn in Milestone'}</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>                        
                        </Col>
                    </Row>
                </Container>
               )

            }else if(this.state.page){
                if(this.state.type = 'task'){
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <Task type={this.state.type} task_id={this.state.task_id} is_complete={this.state.is_complete} /> </Col>
                            </Row>
                        </Container>
                    )
                }
            
                else if (this.state.type = 'milestone'){
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <Task type={this.state.type} instance_id={this.state.instance_id} is_complete={this.state.is_complete}/></Col>
                            </Row>
                        </Container>
                    )                
                }
            }
            else{
                return(<Redirect to='/'/>)
            }           
    }
}
export default ProjectManagementPage;