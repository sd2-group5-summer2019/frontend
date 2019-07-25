import React from 'react';
import "../../index.css";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';

class LogIn extends React.Component {

    constructor(props){
        super(props)
        this.state={
                username:'',
                password:'',
                success:false,
                token:'',
                user_id:''
        }
        
        this.changePage = this.changePage.bind(this);
        this.formHandler = this.formHandler.bind(this);
       }
    
    changeHandler = (event) =>{
       this.setState({
           
        [event.target.name]: event.target.value

       } )
    
    }

    changePage = (response) => {
        console.log(response.data)
    
            if(response.status === 200 && typeof response.data.status === 'undefined' ){
                // just in case, 
                // setState could still be updating
                // recommended we don't depend on it for
                // conditional rendering or something idk
                const payload = {
                    user_id:response.data.user_id,
                    token:response.data.token,
                    userType:response.data.type
                }

                this.setState({
                    success:true,
                    user_id:response.data.id,
                    token:response.data.token
                })

                console.log(this.state)

               this.props.onLogin(payload)
            }
            else
                console.log(response.data)

        console.log(response.data);
        console.log(response.status);
    }

    formHandler = async event => {
        event.preventDefault()
        console.log(this.state)
        console.log(`http://` + this.props.ip_address + `:3001/api/login_secure`)
        axios.post(`http://` + this.props.ip_address + `:3001/api/login_secure`, this.state, {headers:{authorization:this.props.token}})
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error + "in formhandler")})
    }

    render(){
        

        if(this.state.success){
            return <Redirect to="/"/>
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

                    <br></br>
                        <Nav>
                          <Nav.Link href="/register">
                              Register 
                         </Nav.Link>
                        </Nav>
                </form>    

                </div>
                
    
        )
        }
   
}
}

export default connect()(LogIn);