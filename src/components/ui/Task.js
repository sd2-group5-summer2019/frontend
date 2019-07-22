import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectManagementPage from '../pages/ProjectManagementPage';

class Task extends React.Component{

//hard coded users in team for now
    constructor(props) {
        super(props);
        this.state = {
            type:this.props.type,
            is_complete:this.props.is_complete,
            task_id:'',
            instance_id:'',
            users:[{first_name:'bob', last_name:'saget', user_id:'13'}, {first_name:'spongebob', last_name:'squarepants', user_id:'1'}, {first_name:'patrick', last_name:'star', user_id:'2'}],
            token:'testToken',
            task_note:'',
            requested:this.props.flag,
            form_retreived:true,
            form_submitted:false
        };
    
        this.componentWillMount = this.componentWillMount.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
    }
    
    componentWillMount(){
        if(this.state.type === 'task'){
            this.setState({task_id:this.props.task_id})
        }
        else if(this.state.type === 'milestone'){
            this.setState({instance_id:this.props.instance_id})
        }        
        if(this.state.is_complete){
            if(this.state.type === 'task'){
                //backend call to get task info
            }
            else if(this.state.type === 'milestone'){
                //backend call to get milestone info
            }
        } 


    }

    formHandler(event){
        
        event.preventDefault()
        const type = this.state.type
        const payload = {};
        if(type === 'task'){

            payload = {
                task_id:this.state.task_id,
                token:this.state.token,
                time_completed:(new Date().toISOString().slice(0,10)),
                task_note:this.state.task_note   
            }        
        } else if(type === 'milestone'){
            payload = {
                instance_id:this.state.instance_id,
                token:this.state.token,
            }
        }

        console.log(payload)
        axios.post(`http://localhost:3001/api/submitForm`, payload)
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

        if(!form_submitted && !is_complete && type === 'task'){
            return(
                <div>
                    <h1 className="header">Task: {this.state.title} </h1>
                    <p>{this.state.description}</p>
                    <form onSubmit={this.formHandler}>
                        <textarea style={{color:'black'}} name="task_note" value={this.state.task_note} onChange={this.handleChange} placeholder="Enter any information about completing this task."/>
                        <button type="submit"> Submit </button>
                    </form>
                </div>
            )

        } else if(!form_submitted && !is_complete && type === 'milestone'){
            return(
                <div>
                    <h1 className="header">Task: {this.state.title} </h1>
                        <p>{this.state.description}</p>
                        <form onSubmit={this.formHandler}><button type="submit"> Submit </button></form>
                </div>
            )

        } else if (form_submitted){
            return(
                <ProjectManagementPage/>
            )
        } else if (is_complete && type === 'task'){
            //show task info

        } else if (is_complete && type === 'milestone'){
            //show milestone info
        }
      
    }
}

export default Task;