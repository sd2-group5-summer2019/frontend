import React from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from "react-router-bootstrap";

//access_level, description, end_date, start_date, title, user_id, milestone_instance_id, form_threshold, assign_to_id
//            users:[{first_name:'bob', last_name:'saget', user_id:'13'}, {first_name:'spongebob', last_name:'squarepants', user_id:'1'}, {first_name:'patrick', last_name:'star', user_id:'2'}],

class CreateTask extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token:'testToken',
            loading:false,
            title:'',
            team_id:'',
            type:'task',
            description:'',
            start_date:'',
            end_date:'',
            assign_to_id:'',
            milestone_instance_id:'',
            team_members:[{first_name:'bob', last_name:'saget', user_id:'13'}, {first_name:'spongebob', last_name:'squarepants', user_id:'1'}, {first_name:'patrick', last_name:'star', user_id:'2'}],
            milestones:[],
            form_threshold: '',
            form_retreived:false,
            form_submitted:false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.typeHandler = this.typeHandler.bind(this);
        this.assignToHandler = this.assignToHandler.bind(this);
      }
    
    // handles changes on the form on anything that is not a question
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        }) 
    }

    typeHandler(event){
        const type = event.target.name;
        this.setState({
            type:type
        })
    }

    assignToHandler(event){
        const assign_to_id = event.target.name;
        this.setState({
            assign_to_id:assign_to_id
        })
    }

    milestoneSelectionHandler(event){
        const milestone_instance_id = event.target.name;
        this.setState({
            milestone_instance_id:milestone_instance_id
        })
    }

    componentDidMount() {
        axios.post(`http://localhost:3001/api/getTeamID`, this.props.user_id)
        .then(response => {
            this.setState({team_id:response.data})
            console.log(this.state.team_id)
        })
        .catch(function (error){console.log(error)})

        axios.post(`http://localhost:3001/api/getTeamMembers`, this.state.team_id)
        .then(response => {
            this.setState({team_members:response.data})
            console.log(this.state.team_members)
        })
        .catch(function (error){console.log(error)}) 

        axios.post(`http://localhost:3001/api/getMilestones`, this.state.team_id)
        .then(response => {
            this.setState({milestones:response.data})
            console.log(this.state.milestones)
        })
        .catch(function (error){console.log(error)})
    }
//access_level, description, end_date, start_date, team_id, title, user_id
    // handles sending the assignment to the backend
    formHandler(event){
        event.preventDefault()
        const payload = {
                user_id:this.props.user_id,
                access_level:this.props.userType,
                type:this.state.type,
                team_id:this.state.team_id,
                token:this.state.token,
                title:this.state.title,
                description:this.state.description,
                start_date:this.state.start_date,
                end_date:this.state.end_date
            }
        if(this.state.type === 'task'){
            payload.assign_to_id = this.state.assign_to_id
            payload.milestone_instance_id = this.state.milestone_instance_id
            payload.form_threshold = this.form_threshold
        }
         
        console.log(payload)
        axios.post(`http://localhost:3001/api/createForm`, payload)
        .then(response => this.redirectOnSubmit(response))
        .catch(function (error){console.log(error)})
    }

    redirectOnSubmit(res){
        if(res.status===200){
            this.setState({
              form_status:true,
              form_submitted:true
            })  
            console.log(res.data)
        }
        else
            console.log("Something went wrong")
    }

    changePage(res){
        if(res.status===200){
            this.setState({
                title:res.data.title,
                type:res.data.type,
                loading:false,
                form_retreived:true
            })
            console.log(res.data)
        }
        else
            console.log("Something went wrong")
    }
    
    resetForm(){
        this.setState({
            loading:false,
            title:'',
            type:'meeting',
            description:'',
            start_date:'',
            end_date:'',
            form_retreived:false,
            form_submitted:false,
        })
    }
    
    render(){
        const formStatus = this.state.form_retreived
        const form_submitted = this.state.form_submitted


        if(!formStatus && !form_submitted && this.state.type === 'task'){
            return(
                <div>
                    <h1 className="header">Create a New Task</h1>
                    <input type="radio" name="task" onChange={this.typeHandler} checked={this.state.type === 'task'}/>Task
                    <input type="radio" name="milestone" onChange={this.typeHandler} checked={this.state.type === 'milestone'}/>Milestone
                    <Form onSubmit={this.formHandler}>
                        <label>Title: </label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                        <br></br>
                        <label >Start Date: </label>
                        <input type="date" name="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.start_date} onChange={this.handleChange}></input>
                        <br></br>
                        <label >End Date: </label>
                        <input type="date" name="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.end_date} onChange={this.handleChange}></input>
                        <br></br> 
                        <label>Description: </label>                       
                        <textarea style={{color:'black'}} name="description" value={this.state.description} onChange={this.handleChange} placeholder="Description"/>
                        <br></br>


                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.team_members.map(student =>
                                    <tr key={student.user_id}>
                                        <td>{student.first_name} {student.last_name}</td>
                                        <td> <input type="radio" name={student.user_id} value={this.state.assign_to_id} onChange={this.assignToHandler} checked={this.state.assign_to_id === student.user_id}/></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <table>
                            <thead>
                                <tr>
                                    <th>Milestone Name</th>
                                    <th>Milestone Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.milestones.map(milestone =>
                                    <tr key={milestone.instance_id}>
                                        <td>{milestone.name}</td>
                                        <td>{milestone.description}</td>
                                        <td> <input type="radio" name={milestone.instance_id} value={this.state.milestone_instance_id} onChange={this.milestoneSelectionHandler} checked={this.state.milestone_instance_id === milestone.instance_id}/></td>
                                    </tr>
                                )}
                                <tr>
                                    <td>No Milestone for Task</td>
                                    <td></td>
                                    <td><input type="radio" name='' value={this.state.milestone_instance_id} onChange={this.milestoneSelectionHandler} checked={this.state.milestone_instance_id === ''}/></td>
                                </tr>
                            </tbody>
                        </table>

                        <Button variant="primary" type="submit">Create Task</Button>
                    </Form>
                </div>
            )
            } else if(!formStatus && !form_submitted && this.state.type === 'milestone') {
                return(
                    <div>
                        <h1 className="header">Create a New Milestone</h1>
                        <input type="radio" name="task" onChange={this.typeHandler} checked={this.state.type === 'task'}/>Task
                        <input type="radio" name="milestone" onChange={this.typeHandler} checked={this.state.type === 'milestone'}/>Milestone
                        <Form onSubmit={this.formHandler}>
                            <label>Title: </label>
                            <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                            <br></br>
                            <label >Start Date </label>
                            <input type="date" name="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.start_date} onChange={this.handleChange}></input>
                            <br></br>
                            <label >End Date </label>
                            <input type="date" name="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.end_date} onChange={this.handleChange}></input>
                            <br></br>                        
                            <label>Description: </label>                       
                            <textarea style={{color:'black'}} name="description" value={this.state.description} onChange={this.handleChange} placeholder="Description"/>
                            <Button variant="primary" type="submit">Create MileStone</Button>
                        </Form>
                    </div>
                )
            } else if (form_submitted) {
            return(
               <div>
                   <h1>Task Created</h1>
                   <button onClick={this.resetForm}>Create Another Task or Milestone</button>
                   <LinkContainer to="/project">
                            <button>Back to Meetings Menu</button>
                   </LinkContainer>

               </div>
            )
        }
      
    }
}

export default CreateTask;