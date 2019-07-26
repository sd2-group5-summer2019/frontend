import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectManagementPage from '../pages/ProjectManagementPage';
import {Redirect} from 'react-router-dom';

class Task extends React.Component{

//hard coded users in team for now
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            type:this.props.type,
            is_complete:this.props.is_complete,
            instance_id:this.props.instance_id,
            description:this.props.description,
            users:[],
            token:'testToken',
            task_note:'',
            form_retreived:true,
            form_submitted:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        }) 
    }

    formHandler(event){
        
        event.preventDefault()
        let payload;
        console.log(this.state)
        if(this.state.type === 'task'){
            payload = {
                instance_id:this.state.instance_id,
                token:this.state.token,
                type:this.state.type,
                time_completed:(new Date().toISOString().slice(0,10)),
                task_note:this.state.task_note   
            }        
        } else if(this.state.type === 'milestone'){
            payload = {
                instance_id:this.state.instance_id,
                type:this.state.type,
                token:this.state.token,
            }
        }

        console.log(payload)
        axios.post(`http://` + this.props.ip_address + `:3001/api/submitForm`, payload, {headers:{authorization:this.props.token}})
        .then(response => this.redirectOnSubmit(response))
        .catch(function (error){console.log(error)})
        

    }

    redirectOnSubmit(res){
        if(res.status===200){
            this.setState({
              form_submitted:true
            })  
            console.log(res.data)
        }
        else
            console.log("Something went wrong")
    }

    render(){
        const form_submitted = this.state.form_submitted
        const type = this.state.type
        const is_complete = this.state.is_complete
        console.log(this.state)
        if(!form_submitted && type === 'task'){
            return(
                <div>
                    <h1 className="header">Task: {this.state.title} </h1>
                    <p>{this.state.description}</p>
                </div>
            )

        } else if(!form_submitted && type === 'milestone'){
            return(
                <div>
                    <h1 className="header">Milestone: {this.state.title} </h1>
                        <p>{this.state.description}</p>
                </div>
            )

        } else if (form_submitted){
            return (<Redirect to='/'/>)
        } 
        else {
            return (<div><h1>ERROR</h1></div>)
        }
      
    }
}

export default Task;