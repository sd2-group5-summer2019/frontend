import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Meeting extends React.Component{

//[{first_name:'bob', last_name:'saget', user_id:'13'}, {first_name:'spongebob', last_name:'squarepants', user_id:'1'}, {first_name:'patrick', last_name:'star', user_id:'2'}]
    constructor(props) {
        super(props);
        this.state = {
            flag:false,
            instance_id:this.props.instance_id,
            team_id:'',
            team_members:[],
            token:'testToken',
            reasons:[],
            loading:false,
            title:this.props.title,
            description:this.props.description,
            requested:this.props.flag,
            form_retreived:true,
            form_submitted:false
        };
    
        this.componentDidMount = this.componentDidMount.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.absenceHandler = this.absenceHandler.bind(this);
    }
    
    componentDidMount(){
        const payload = {
            user_id: this.props.user_id
        }
        console.log(this.props.token)
        axios.post(`http://` + this.props.ip_address + `:3001/api/getTeamID`, payload, {headers:{authorization:this.props.token}})
        .then(response_team_id => {
            this.setState({team_id:response_team_id.data.team_id[0].team_id})
            console.log(response_team_id.data)

            axios.post(`http://` + this.props.ip_address + `:3001/api/getTeamMembers`, {team_id:response_team_id.data.team_id[0].team_id}, {headers:{authorization:this.props.token}})
            .then(response_team_members => {
                this.setState({team_members:response_team_members.data.team_members})
                console.log(response_team_members.data)
            })
            .catch(function (error){console.log(error)}) 
        })
        .catch(function (error){console.log(error)})

        const temp = this.state.team_members;
        for(var i = 0; i < temp.length; i++)
        {
            temp[i].did_attend = true;
            temp[i].reason = ""
        }
        this.setState({
            team_members:temp,
            flag:true
        })    
    }

    formHandler(event){
        
        event.preventDefault()
        const payload = {
            type:'attendance',
            token:this.state.token,
            instance_id:this.state.instance_id,
            users:this.state.users   
        }
        console.log(payload)
        axios.post(`http://` + this.props.ip_address + `:3001/api/createForm`, payload, {headers:{authorization:this.props.token}})
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

    absenceHandler(event) {
        const temp = this.state.team_members
        const user_id = event.target.name
        const reason = event.target.value
        for(var i = 0; i < temp.length; i++){
            if(temp[i].user_id === user_id){
                if(!reason.length)
                    temp[i].did_attend=true
                else
                    temp[i].did_attend=false
                temp[i].reason=reason
            }            
        }
        this.setState({team_members:temp})
    }

    render(){

        const form_submitted = this.state.form_submitted
        console.log("hello" + this.props.token)

        if(!form_submitted){
            return(
                <div>
                    <h1 className="header">{this.state.title} </h1>
                    <h2>Agenda</h2>
                    <p>{this.state.description}</p>
                    <h3>Meeting Attendance</h3>
                    <p>If anyone was absent for this meeting, please write a reason below.</p>
                    <form onSubmit={this.formHandler}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Reason for Absence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.team_members.map(student =>
                                    <tr key={student.user_id}>
                                        <td>{student.first_name} {student.last_name}</td>
                                        <td> <input type="text" name={student.user_id} value={this.state.reasons.reason} onChange={this.absenceHandler}/> 
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        <button type="submit"> Submit </button>
                    </form>
                </div>
            )
        } else if (form_submitted) {
            return(
                <h1>Meeting Completed</h1>
            )
        }
      
    }
}

export default Meeting