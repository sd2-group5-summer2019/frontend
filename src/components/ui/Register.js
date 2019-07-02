import React from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import "../../index.css";

class Register extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            type:'',
            first_name:'',
            last_name:'',
            email:'',
            errors: {},
            success:false
        }
        
        this.changeHandler = this.changeHandler.bind(this)
        this.changePage = this.changePage.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.changeType = this.changeType.bind(this)
    };
    
    changeHandler(e) {
        this.setState({
            [e.target.name] :e.target.value
                      })
    }
    changeType(e){
        this.setState({
            type:e.target.id
        })
    }
    changePage = (response)=>{
        if(response.status===200){
            this.setState({success:true})
        }
        console.log(response.data);
    }
    
    submitHandler(e) {

        e.preventDefault();

        if (this.validateForm()){
            
            console.log(this.state)
            axios.post(`http://localhost:3001/api/register`, this.state)
            .then(response => this.changePage(response))
            .catch(function (error){console.log(error)})
            alert("Form submitted");
        }
    }
    
    validateForm() {
        
        let first_name = this.state.first_name;
        let last_name = this.state.last_name;
        let username = this.state.username
        let password = this.state.password
        let email = this.state.email
        let type = this.state.type;
        let errors = {};
        let formIsValid = true;

        if (!first_name) {
        formIsValid = false;
        errors["first_name"] = "*Please enter your first name.";
        }
                       
        if (!last_name) {
        formIsValid = false;
        errors["last_name"] = "*Please enter your last name.";
        }
                       
        if (!username) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }
        
        if (!email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }
        
        if (!password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
                
       if (!type) {
       formIsValid = false;
       errors["type"] = "*Please select a user type.";
       }

        this.setState({
                      errors: errors
                      });
        return formIsValid;
    }
    
    render() {
        if(this.state.success){
            return <Redirect to="/login"/>
        }
        else{
            return (

                    <div className="boxThing" id="register">
                        <h1>Registration</h1>
                    <form method="post"  name="userRegistrationForm"  onSubmit= {this.submitHandler}>
                            <label>First Name </label>
                            <br></br>
                            <div className="errorMsg">{this.state.errors.first_name}</div>
                            <br></br>
                            <input type="text" name="first_name" value={this.state.first_name} onChange={this.changeHandler} />
                            <br></br>
                    
                            <label>Last Name</label>
                            <br></br>
                            <div className="errorMsg">{this.state.errors.last_name}</div>
                            <br></br>
                            <input type="text" name="last_name" value={this.state.last_name} onChange={this.changeHandler} />
                            <br></br>
                    
                            <label>Username or NID:</label>
                            <br></br>
                            <div className="errorMsg">{this.state.errors.username}</div>
                            <br></br>
                            <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}/>
                            <br></br>
                    
                            <label>Email:</label>
                            <br></br>
                            <div className="errorMsg">{this.state.errors.email}</div>
                            <br></br>
                            <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
                            <br></br>
                    
                            <label>Password</label>
                            <br></br>
                            <div className="errorMsg">{this.state.errors.password}</div>
                            <br></br>
                            <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} />
                            <br></br>

                            <label>User Type</label>
                            <br></br>
                            <div className="errorMsg">{this.state.errors.type}</div>
                            <br></br>
                            <b>Student</b>
                            <input type="radio" id="student" name="type" value={this.state.type} onChange={this.changeType} />
                            <b>Admin</b>
                            <input type="radio" id="admin" name="type" value={this.state.type} onChange={this.changeType} />
                            <b>Sponsor</b>
                            <input type="radio" id="sponsor" name="type" value={this.state.type} onChange={this.changeType} />
                            <b>Coordinator</b>
                            <input type="radio" id="coordinator" name="type" value={this.state.type} onChange={this.changeType} />
                            <br></br>
                            <input type="submit" className="button"  value="Register"/>
                        </form>
                    </div>
                    );
        }
    }
}

export default Register;
