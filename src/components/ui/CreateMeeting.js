import React from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from "react-router-bootstrap";

//team id is hard coded atm
class CreateMeeting extends React.Component{
//access_level, title, user_id, description, team_id, start_date, end_date
    constructor(props) {
        super(props);
        this.state = {
            user_id:'13',
            token:'testToken',
            loading:false,
            title:'',
            team_id:'1',
            type:'meeting',
            description:'',
            start_date:'',
            end_date:'',
            form_retreived:false,
            form_submitted:false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
      }
    
    // handles changes on the form on anything that is not a question
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        }) 
    }

    // handles sending the assignment to the backend
    formHandler(event){
        event.preventDefault()
        const payload = {
            user_id:'13',
            access_level:'coordinator',
            type:this.state.type,
            team_id:this.state.team_id,
            token:this.state.token,
            title:this.state.title,
            description:this.state.description,
            start_date:this.state.start_date,
            end_date:this.state.end_date,
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
            type:'Meeting',
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

        if(!formStatus && !form_submitted){
            return(

                <div>
                    <h1 className="header">Create a New Meeting</h1> 
                    <Form onSubmit={this.formHandler}>
                        <label>Title: </label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                        <br></br>
                        <label >Start Date </label>
                        <input type="date" name="start_date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.start_date} onChange={this.handleChange}></input>
                        <br></br>
                        <label>End Date</label>
                        <input type="date" name="end_date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.end_date} onChange={this.handleChange}></input>
                        <br></br>
                        <br></br>
                        <textarea style={{color:'black'}} name="description" value={this.state.description} onChange={this.handleChange} placeholder="Brief Description (optional)..."/>
                        <br></br>
                        <Button variant="primary" type="submit">Create {this.state.type}</Button>
                        
                    </Form>
                </div>
            )
        }  else if (form_submitted) {
            return(
               <div>
                   <h1>Meeting created</h1>
                   <button onClick={this.resetForm}>Create Another Meeting</button>
                   <LinkContainer to="/meetings">
                            <button>Create New Meeting</button>
                   </LinkContainer>

               </div>
            )
        }
      
    }
}

export default CreateMeeting;