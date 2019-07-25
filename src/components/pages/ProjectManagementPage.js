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
                type:'',
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
            axios.post(`http://` + this.props.ip_address + `:3001/api/getInstances`, payload, {headers:{authorization:this.props.token}})
            .then(response => {
                const milestones = [];
                const tasks = [];
                for(var i = 0; i < response.data.length; i++) {
                    if(response.data[i].type === 'milestone'){
                        milestones.push(response.data[i])
                    }
                    if(response.data[i].type === 'task') {

                        const name_payload = {
                            user_id:response.data[i].user_id
                        }
                        const temp = response.data[i]
                        axios.post(`http://` + this.props.ip_address + `:3001/api/getStudentName`, name_payload, {headers:{authorization:this.props.token}})
                        .then(response_name => {
                            temp.name = response_name.data.first_name + " " + response_name.data.last_name 
                            console.log(temp)
                            tasks.push(temp)
                            this.setState({tasks:tasks})
                        })
                        .catch(function(error){console.log(error)})
                        console.log(temp)
                    }
                }
                this.setState({
                    milestones:milestones,
                })
                console.log(response.data)
            })
            .catch(function (error){console.log(error)})
            console.log(this.state.tasks)
        }
        
        changePage(event){
            event.preventDefault();
            const id = event.target.id
            const type = event.target.title
            if(type === "task"){
                const tasks = this.state.tasks;
                for(var i = 0; i < tasks.length; i++) {
                    if(tasks[i].instance_id.toString() === id) {
                        this.setState({
                            title:tasks[i].title,
                            instance_id:tasks[i].instance_id,
                            type:"task",
                            description:tasks[i].description,
                            is_complete:tasks[i].is_complete,
                            page:true
                        })
                    }
                }

            } else {
                const milestones = this.state.milestones
                for(var i = 0; i < milestones.length; i++) {
                    if(milestones[i].instance_id.toString() === id) {
                        this.setState({
                            title:milestones[i].title,
                            instance_id:milestones[i].instance_id,
                            type:"milestone",
                            description:milestones[i].description,
                            is_complete:milestones[i].is_complete,
                            page:true
                        })
                    }
                }
            }          
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
                                            <td> <button id={milestone.instance_id} title={milestone.type} name={milestone.description} value={milestone.is_complete} onClick={this.changePage}>View Summary</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>                           
                             <h2>Tasks</h2>
                            <Table  responsive="sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Assigned to</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                 <tbody>
                                     {this.state.tasks.map(task =>
                                        <tr key={task.instance_id}>
                                            <td>{task.title}</td>
                                            <td>{task.name}</td>
                                            <td>{task.end_date}</td>
                                            <td>{task.is_complete ? 'Completed' : 'Not Started' }</td>
                                            <td> <button id={task.instance_id} title={task.type} onClick={this.changePage}>View Summary</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>
                     
                        </Col>
                    </Row>
                </Container>
               )

            }else if(this.state.page){
                return(
                    <Container>
                        <Row>
                            <Col sm={3}> <MenuContainer/> </Col>
                            <Col sm={9}> <Task title={this.state.title} description={this.state.description} type={this.state.type} instance_id={this.state.instance_id} type={this.state.type} is_complete={this.state.is_complete} /> </Col>
                        </Row>
                    </Container>
                )
            }else{
                return(<Redirect to='/'/>)
            }           
    }
}
export default ProjectManagementPage;