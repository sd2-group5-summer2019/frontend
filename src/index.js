import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'
class LogIn extends React.Component {

    constructor(props){
        super(props)
        this.state={
            id:'',
            passwd:''
        }
    }

    changeHandler = (event) =>{
       this.setState({
           
        [event.target.name]: event.target.value

       } )
    
    }
  
    formHandler = (event) => {
        event.preventDefault()
        console.log(this.state)
        axios.post(`http://localhost:3001/api/login`, this.state)
        .then(response => {console.log(response.data)})
        .then(error => {console.log(error)})
    }

    // submit = e => {
    //     e.preventDefault()
    //     console.log(typeof(e.target.elements.psw.value))

    //     //let request = { 
    //      //   username: e.target.elements.ID.value ,
    //       //  password: e.target.elements.psw.value  
    //     //}
    //     console.log(JSON.stringify(request))
    //     fetch('http://localhost:3001/api/login', {
    //         method: 'POST', 
    //         body: JSON.stringify(e.value)
    //       })
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }

    render(){
    return(
        

            <div className="boxThing">
                   <h1> Login </h1>
    
              <form onSubmit={this.formHandler}>

                <label> NID or knights Email </label>
                <br></br>
                <input name="id" value={this.state.id} onChange={this.changeHandler} type="text"></input>
                <br></br>
                <label> password </label>
                <br></br>
                <input name="passwd" value={this.state.passwd} onChange={this.changeHandler} type="password" ></input>
                <br></br>
                <button type="submit">Submit</button>
                <br></br>
            </form>
            
            </div>
        
    )
}
}
const Dashboard = () =>{
    return(
        <div>
            <p>gonna put a navbar in here somewhere as another component</p>
            <h1>Dashboard</h1>
        </div>
    )
}

class HomePage extends React.Component{
    // if user is not logged in shows only the log in page
    // so the state tracks whether or not user is logged in
    // it shows if the page is loading while accessing the data that
    // is sent back from the end
    state = {
        loggedIn:false,
        loading:false
    }

    render(){
        return(
            <div>
                <h1 className="header">Senior Design Portal</h1>
                {this.state.loggedIn ? <Dashboard /> : <LogIn/>}
            </div>

        )
    }
}
ReactDOM.render(
        <HomePage />,
    document.getElementById('root')
)
//palette
// Light tan : #F5F0E6 background general
// bright gold: #EAAB0B headers and buttons
// dark violet: #312A37 highlight over things idk use sparingly
// white:#FFFFFF text on dark backgrounds
// dark grey/black: #282C0B headings, outlines, text light backgrounds