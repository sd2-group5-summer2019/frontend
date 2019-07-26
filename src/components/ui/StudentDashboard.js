import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import MenuContainer from '../containers/MenuContainer';
import {TaskC} from '../containers/CreateTaskC';
import {MeetingC} from '../containers/CreateMeetingC';
import {Redirect} from 'react-router-dom';
import {TakeAssignmentContainer} from '../containers/GeneralContainer';
class StudentDashboard extends React.Component{

    constructor(props){
        super(props)
        this.state={
            assignments:[],
            meetings:[],
            tasks:[],
            title:'',
            description:'',
            instance_id:'',
            is_complete:'',
            start_date:'',
            end_date:'',
            type:'',
            form_id:'',
            page:false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.changePage = this.changePage.bind(this);

    }

        changePage(event){
           event.preventDefault();
           let res;
           const meetings = this.state.meetings;
           const tasks = this.state.tasks;
           const assignments = this.state.assignments;
           console.log(event.target.title)
           if(event.target.title === "meeting"){
            for(var i = 0; i < meetings.length; i++) {
                if(meetings[i].instance_id.toString() === event.target.id) {
                    res = meetings[i]
                }
            }
                this.setState({
                   title:res.title,
                   type: res.type,
                   description:res.description,
                   instance_id: res.instance_id,
                   is_complete: res.is_complete,
                   start_date: res.start_date,
                   end_date: res.end_date,
                   page:true
               })   
           
            } else if(event.target.title === "task"){

                for(var i = 0; i < tasks.length; i++) {
                    if(tasks[i].instance_id.toString() === event.target.id){

                        res = tasks[i]
                    }
                }
                    this.setState({
                       title:res.title,
                       type:res.type,
                       description:res.description,
                       instance_id: res.instance_id,
                       is_complete: res.is_complete,
                       start_date: res.start_date,
                       end_date: res.end_date,
                       page:true
                   })   
          
                } 
                else {
                    for(var i = 0; i < assignments.length; i++) {
                        if(assignments[i].instance_id.toString() === event.target.id){
                            res = assignments[i]
                        }
                    }
                        this.setState({
                           title:res.title,
                           type:res.type,  
                           description:res.description,
                           instance_id: res.instance_id,
                           is_complete: res.is_complete,
                           start_date: res.start_date,
                           end_date: res.end_date,
                           form_id:res.form_id,
                           page:true
                       })            
                }          

        }

    componentDidMount(){
        const assignments =[]
        const meetings = []
        const tasks = []
        const payload = {"user_id": this.props.user_id}
        axios.post(`http://` + this.props.ip_address  + `:3001/api/getInstances`, payload, {headers:{authorization:this.props.token}})
        .then(res =>{
            var item;
            for(var i = 0; i < res.data.length; i++)
            {
                item = res.data[i]
                if(item.is_complete === 0 && (item.type === 'survey' || item.type === 'quiz')) {
                    assignments.push(item)
                }
                if(item.is_complete === 0 && (item.type === 'meeting')) {
                    meetings.push(item)
                }
                if (item.is_complete === 0 && (item.type === 'task') && item.user_id === this.props.user_id) {
                    tasks.push(item)
                }
                    
            }
            this.setState({
                assignments:assignments,
                meetings:meetings,
                tasks:tasks
            })
            console.log(this.state)
        
        }
        ).catch(
            error=>console.log(error)
        )
    }


    render(){
        
        console.log(this.state.type)
            if(!this.state.page){
               return(
                  <Container>
                    <Row className="text-center"> <h1>Student Dashboard</h1></Row>
                    <Row>
                        <Col sm={3}><MenuContainer/></Col>
                        <Col sm={9}>

                        <h2>Assignments</h2>
                            <Table  responsive="sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Due Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                 <tbody>
                                     {this.state.assignments.map(assignment =>
                                        <tr key={assignment.instance_id}>
                                            <td>{assignment.title}</td>
                                            <td>{assignment.type}</td>
                                            <td>{assignment.end_date}</td>
                                            <td> <button id={assignment.instance_id} title={assignment.type} onClick={this.changePage}>Take</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>                           
                             <h2>Tasks</h2>
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
                                     {this.state.tasks.map(task =>
                                        <tr key={task.instance_id}>
                                            <td>{task.title}</td>
                                            <td>{task.name}</td>
                                            <td>{task.end_date}</td>
                                            <td> <button id={task.instance_id} title={task.type} onClick={this.changePage}>View Summary</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>
                            <h2>Meetings</h2>
                            <Table  responsive="sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                 <tbody>
                                     {this.state.meetings.map(meeting =>
                                        <tr key={meeting.instance_id}>
                                            <td>{meeting.title}</td>
                                            <td>{meeting.start_date}</td>
                                            <td><button id={meeting.instance_id} title={meeting.type} onClick={this.changePage}>Begin</button></td> 
                                        </tr>
                                    )}
                                 </tbody>
                             </Table>                    
                        </Col>
                    </Row>
                </Container>
               )

            }else {
                console.log(this.state)
                if(this.state.type === 'task') {
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <TaskC title={this.state.title} description={this.state.description} type={this.state.type} instance_id={this.state.instance_id} type={this.state.type} is_complete={this.state.is_complete} /> </Col>
                            </Row>
                        </Container>
                    )
                } else if(this.state.type === 'meeting') {
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <MeetingC instance_id={this.state.instance_id} title={this.state.title} description={this.state.description} /> </Col>
                            </Row>
                        </Container>
                    )
                } else if (this.state.type === 'quiz' || this.state.type === 'survey'){
                    return(
                        <Container>
                            <Row>
                                <Col sm={3}> <MenuContainer/> </Col>
                                <Col sm={9}> <TakeAssignmentContainer instance_id={this.state.instance_id} form_id={this.state.form_id} /> </Col>
                            </Row>
                        </Container>
                    )
                }

            }   
        
    }
}

export default StudentDashboard;