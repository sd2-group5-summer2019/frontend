import React from 'react';
import './index.css';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';


class LogIn extends React.Component {

    constructor(props){
        super(props)
        this.state={
                username:'',
                password:'',
                success:false
        }
        
       }
    
    changeHandler = (event) =>{
       this.setState({
           
        [event.target.name]: event.target.value

       } )
    
    }

    loadNewPage = ()=>{
        this.setState({
            success:true
        })
    }
    
    
  
    formHandler = async event => {
        event.preventDefault()
        console.log(this.state)
        axios.post(`http://localhost:3001/api/login`, this.state)
        .then(function (response) {
            if(response.status===200){
                console.log(response.data)
                //this.history.props.userLoggedIn(true)
                this.loadNewPage()
            }
            else
                console.log(response.data)})
        .catch(function (error){console.log(error)})
    }

    render(){

        if(this.state.success===true){
            return <Redirect to="/survey"/>
        }
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

export default LogIn;