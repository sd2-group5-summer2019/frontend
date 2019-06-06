import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router'

class LogIn extends React.Component {

    constructor(props){
        super(props)
        this.state={
            username:'',
            password:''
        }
    }
    
    changeHandler = (event) =>{
       this.setState({
           
        [event.target.name]: event.target.value

       } )
    
    }
    
    componentWillUnmount(){
        this.setState({
            username:'',
            password:''
        })
    }
  
    formHandler = (event) => {
        event.preventDefault()
        console.log(this.state)
        axios.post(`http://localhost:3001/api/login`, this.state)
        .then(function(response){
        })
        .then(error => {console.log(error)})
    }

    

    render(){
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


function Survey (){
    return(
        <div>
            <h1 className="header">Senior Design Portal</h1>
            <p>gonna put a navbar in here somewhere as another component</p>
            <h1>Dashboard</h1>
        </div>
    )
}


 ReactDOM.render(
        <LogIn />,
     document.getElementById('root')
 )

