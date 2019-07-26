import React from 'react';
import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuContainer from '../containers/MenuContainer';
import {TaskC} from '../containers/CreateTaskC';
import {MeetingC} from '../containers/CreateMeetingC';
import {Redirect} from 'react-router-dom';
import {TakeAssignmentContainer} from '../containers/GeneralContainer';

class Student extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            student_id:this.props.student_id,
            instances: [],
            title:'',
            type: '',
            description:'',
            instance_id: '',
            is_complete: '',
            start_date: '',
            end_date: '',
            form_id:'',
            student_name:'',
            attendance:[],
            results:[],
            page:false,
            files:null
		}
		this.changePage = this.changePage.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}



    componentDidMount() {
    	const payload = {
			"user_id":this.state.student_id
		}
		console.log(payload)
    	axios.post(`http://` + this.props.ip_address + `:3001/api/getInstances`, payload, {headers:{authorization:this.props.token}})
        .then(res => {

        	const temp = []
        	for(var i = 0; i < res.data.length; i++){
        		//console.log(res.data[i])
        		console.log(this.state.student_id)
        		if(res.data[i].user_id && this.state.student_id === res.data[i].user_id.toString() || res.data[i].type === 'meeting') {
        			temp.push(res.data[i])
        		}
        	}
            this.setState({instances:temp})
            console.log(temp);
        })                        
        .catch(function(error){console.log(error)})


        axios.post(`http://` + this.props.ip_address + `:3001/api/getStudentName`, payload, {headers:{authorization:this.props.token}})
        .then(res => {
        	this.setState({student_name:res.data.first_name + " " + res.data.last_name})
        	console.log(res.data)
        })                        
        .catch(function(error){console.log(error)})

    }
    changePage(event) {
        let res;
        for(var i = 0; i < this.state.instances.length; i++){
            if(this.state.instances[i].instance_id.toString() === event.target.id){
                res = this.state.instances[i]
            }
        }

        if(res.is_complete === 1 && res.type === 'meeting'){
            const payload = {
                instance_id:res.instance_id
            }
            console.log(payload)
            axios.post(`http://` + this.props.ip_address + `:3001/api/getAttendance`, payload, {headers:{authorization:this.props.token}})
            .then(response => {
                this.setState({attendance:response.data})
            })
            .catch(function (error){console.log(error)})  
       }  
        else if(res.is_complete && res.type === 'survey' || res.type === 'quiz'){
                const payload = {
                    userid: res.user_id,
                    formid: res.form_id,
                    type: res.type
                }

                console.log(this.state)
                axios.post(`http://` + this.props.ip_address + `:3001/api/getAnswers`, payload, {headers:{authorization:this.props.token}})
                .then(response => {
                    this.setState({results: response.data});
                } )
                .catch(function (error){console.log(error)})
         }  
            this.setState({
           title:res.title,
           type: res.type,
           description:res.description,
           instance_id: res.instance_id,
           is_complete: res.is_complete,
           start_date: res.start_date,
           end_date: res.end_date,
           form_id: res.form_id,
           page:true
       })  
       }
	//GET ALL GROUPS FOR PARTICULAR COURSE FROM BACKEND
	//GET ALL GROUPS IN APP
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE
    render() {
        console.log(this.state)
        var attendance;
        if(this.state.attendance.length > 0){
            attendance = 
            <div>
            <Table  responsive="sm" striped bordered hover>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Reason for absense</th>
                </tr>
            </thead>
             <tbody>
                 {this.state.attendance.map((student, i) =>
                    <tr key={i}>
                        <td>{student.first_name} {student.last_name}</td>
                        <td>{student.reason}</td>
                    </tr>
                )}
             </tbody>
         </Table>
         </div>
        }
        console.log(this.state.page)
    	if(!this.state.page){
        	return(
	        	<div>
		            <h1>{this.state.student_name}</h1>
		            <h2>Forms</h2>
            		<Table>
						<thead>
                            <tr>
                                <th>Name</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                         <tbody>
                             {this.state.instances.map(instance =>
                                <tr key={instance.instance_id}>
                                    <td>{instance.title}</td>
                                    <td>{instance.end_date}</td>
                                    <td>{instance.is_complete ? 'Completed' : 'Not Started' }</td>
                                    <td> <button id={instance.instance_id} onClick={this.changePage}>View Summary</button></td> 
                                </tr>
                            )}
                         </tbody>
                     </Table>    	            
              	</div>
        	)
    	}
        else if(this.state.page) {
            if(this.state.type === 'task') {
                return(     
                       <Col sm={9}><h2>Task: {this.state.title} </h2>
                        <h3>Description</h3>
                        <p>{this.state.description}</p>
                         </Col>
                )
            } else if(this.state.type === 'meeting' && this.state.is_complete) {
                return(
                    <Col sm={9}>  
                        <h2>Meeting Results for {this.state.title} on {this.state.start_date}</h2>
                        <h3>Agenda</h3>
                        <p>{this.state.description}</p>
                        <h3>Absent Students</h3>
                        {attendance}
                    </Col>                
                )
            } else if ((this.state.is_complete) && (this.state.type === 'quiz' || this.state.type === 'survey')){
                console.log(this.state)
                console.log(this.state.results)
                return(
                    <Col sm={9}>
                    <div><h1>Results</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Questions</th>
                                <th>Answers</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map(result =>
                                <tr key={result.question_text}>
                                    <td>{result.question_text}</td>
                                    <td>{result.answer_text}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table></div>
                    </Col>
                )
            } else {
                return (<h1>{this.state.student_name} has not completed his form yet!</h1>
                    )
            }
        }
    }
}
export default Student;