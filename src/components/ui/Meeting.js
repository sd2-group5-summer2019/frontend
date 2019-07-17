import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Meeting extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            instance_id:this.props.instance_id,
            user_id:'',
            team_id:'',
            users:[{first_name:'bob', last_name:'saget', user_id:'13'}, {first_name:'spongebob', last_name:'squarepants', user_id:'1'}, {first_name:'patrick', last_name:'star', user_id:'2'}],
            token:'testToken',
            loading:false,
            title:this.props.title,
            description:this.props.description,
            did_not_attend:[],
            requested:this.props.flag,
            form_retreived:true,
            form_submitted:false
        };
    
        // this.handleChange1 = this.handleChange1.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);

        // this.requestForm = this.requestForm.bind(this);
        // this.changePage = this.changePage.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.absenceHandler = this.absenceHandler.bind(this);

    }
    
    componentWillMount(){
        const temp = this.state.users;
        for(var i = 0; i < temp.length; i++)
        {
            temp[i].did_attend = true;
            temp[i].reason = ""
        }
        this.setState({users:temp})
    }
    // handleChange1(event){
    //     this.setState({
    //         instance_id:event.target.value
    //     }) 
    // }



    // requestForm(event){
    //     event.preventDefault()
    //     const payload = {
    //         formid: this.state.form_id
    //     }
    //     this.setState({loading:true})
    //     console.log(this.state.instance_id)
    //     axios.post(`http://localhost:3001/api/getForm`, payload)
    //     .then(response => this.changePage(response))
    //     .catch(function (error){console.log(error)})

    // }


    
    // handles sending the survey to the backend
    formHandler(event){
        
        event.preventDefault()
        const payload = {
            type:'attendance',
            token:this.state.token,
            instance_id:this.state.instance_id,
            users:this.state.users   
        }
        console.log(payload)
        axios.post(`http://localhost:3001/api/createForm`, payload)
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

    // // processes the response from the form request
    // // stores the questions array in data
    // // changes form_retrieved to true so render can load the
    // // survey form to the page 
    // changePage(res){
        
    //     if(res.status===200 && typeof res.data.status === 'undefined'){
    //         const result = res.data.result[0]
    //             this.setState({
    //             title:result.title,
    //             type:result.type,
    //             description:result.description,
    //             loading:false,
    //             form_retreived:true
    //             })
    //     }
    //     else
    //         console.log(res.data.status)
    //     console.log(this.state)

    // }
    absenceHandler(event) {
        const temp = this.state.users
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
        this.setState({users:temp})
    }

    render(){

        console.log(this.state.users)
        const formStatus = this.state.form_retreived
        const form_submitted = this.state.form_submitted

        if(!formStatus){
            return(
                
                <div>
                <h1>Request Meeting/form (for testing purposes for now)</h1>
                <p> this isnt gonna be a thing in the final product though</p>
                <form onSubmit={this.requestForm}>
                    <label>Enter Form Id </label>
                    <input type="text" name="instance_id" value={this.state.instance_id} onChange={this.handleChange1}></input>
                    <button type="submit">Request Form/survey</button>
                </form>
                </div>
            )
        } else if(formStatus && !form_submitted){
            
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
                                    <th>Reason for Absense</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(student =>
                                    <tr key={student.user_id}>
                                        <td>{student.first_name} {student.last_name}</td>
                                        <td> <input type="text" name={student.user_id} value={this.state.did_not_attend.reason} onChange={this.absenceHandler}/> 
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