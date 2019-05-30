import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class LogIn extends React.Component {

    submit = e => {
        e.preventDefault()
        console.log(e.target.elements.ID.value)
        var box = { 
            username:e.target.elements.ID.value,
            password:e.target.elements.psw.value
        }
        console.log(JSON.stringify(box))
        fetch('http://localhost:3001/api/login', {method: 'POST', body: JSON.stringify(box)})
            .then(res => res.json())
            .then(json => console.log(json))
    }

    render(){
    return(
        <div>
            <h1> Login </h1>
            <form onSubmit={this.submit}>
                <label> NID or knights Email </label>
                <input name="ID" type="text"></input>
                <label> password </label>
                <input name="psw" type="password" ></input>
                <button>Submit</button>
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


    // fetches the data from the frontEnd
     componentDidMount(){
         fetch('http://localhost:3001/api', {method: 'GET'})
             .then(res=>res)
             .then(res=> console.log(res))

     }


    render(){
        return(
            <div>
                <h1>Senior Design Portal</h1>
                {this.state.loggedIn ? <Dashboard /> : <LogIn/>}
            </div>

        )
    }
}
ReactDOM.render(
        <HomePage />,
    document.getElementById('root')
)