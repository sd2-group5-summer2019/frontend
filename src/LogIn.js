import React from 'react';
import './index.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { bindExpression } from '@babel/types';


class LogIn extends React.Component {

    constructor(props){
        super(props)
        this.state={
                username:'',
                password:'',
                success:false
        }
        
        this.changePage = this.changePage.bind(this);
        this.formHandler = this.formHandler.bind(this);
       }
    
    changeHandler = (event) =>{
       this.setState({
           
        [event.target.name]: event.target.value

       } )
    
    }

    changePage = (response)=>{
        
    
            if(response.status===200){
                this.setState({success:true})
            }
            else
                console.log(response.data)

        console.log(response.data);
    }

    formHandler = async event => {
        event.preventDefault()
        console.log(this.state)
        axios.post(`http://localhost:3001/api/login`, this.state)
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})
    }

    render(){
        

        if(this.state.success){
            return <Redirect to="/survey"/>
        }else{
            return(
        
                <div className="boxThing">
                       <h1> Login </h1>
        
                  <form onSubmit={this.formHandler}>
    
                    <label> NID or knights Email </label>
                    <br></br>
                    <input name="username" value={this.state.id} onChange={this.changeHandler} type="text"></input>
                    <br></br>
                    <label> password </label>
                    <br></br>
                    <input name="password" value={this.state.passwd} onChange={this.changeHandler} type="password" ></input>
                    <br></br>
                    <button type="submit">Submit</button>
                    <br></br>
                </form>        
                </div>
    
        )
        }
   
}
}

export default LogIn;