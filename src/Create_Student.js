import React from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import './index.css';
import Select from 'react-select';

//NEED TO FIGURE OUT HOW TO ADD A SPONSOR FOR A TEAM
//HOW TO ADD STUDENTS TO A TEAM
class Create_Student extends React.Component {
	constructor(props) {
		super(props) 
		this.state = {
			nid: '',
            first_name: '',
            last_name: '',
            email: '',
            team: '',
            all_teams: [],
			success:false
		}
			this.changeHandler = this.changeHandler.bind(this)
	        this.changePage = this.changePage.bind(this)
	        this.submitHandler = this.submitHandler.bind(this)
            this.setTeam = this.setTeam.bind(this)
            this.state.all_teams = [{id: "nid", project_name: "name", sponsor: "Heinrik", num_students: "5"},
                                    {id: "12", project_name: "name2", sponsor: "Heinr22ik", num_students: "51"}
            ]
	}

    changeHandler(e) {
        this.setState({
            [e.target.name] :e.target.value
                      })
    }

    setTeam(e) {
        this.state.team = e.value
    }

    changePage = (response)=>{
        if(response.status===200){
            this.setState({success:true})
        }
        console.log(response.data);
    }

    submitHandler(e) {
        e.preventDefault();

        console.log(this.state)
        axios.post(`http://localhost:3001/api/create_student`, this.state)
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})
        alert("Form submitted");
        
    }

    componentDidMount() {
    axios.get('http://localhost:3001/api/get_all_teams')
        .then(res => {
            this.state.all_teams = res.data;
        })
    }

    render(){
        if(this.state.success){
            return <Redirect to="/students"/>
        }
    	return(
    		<div className="boxName" id="create_student">
    			<form method="post" name="createStudentForm" onSubmit={this.submitHandler}>
    				<label>NID</label>
    				<input type="text" name="nid" value={this.state.nid} onChange={this.changeHandler}/>
    				<br></br>
    				<label>First Name</label>
    				<input type="text" name="first_name" value={this.state.first_name} onChange={this.changeHandler}/>
    				<br></br>
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.changeHandler}/>
                    <br></br>   
                    <label>Email</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
                    <br></br>
                    <label>Team</label>
                    <Select
                        options={this.state.all_teams.map(team => ({ label: team.project_name, value: team.id}))}
                        getOptionValue={({value}) => value}
                        onChange={({value}) => this.setTeam({value})}
                    />
    				<br></br> 				
	            	<input type="submit" className="button" value="Create Student"/>
    			</form>
    		</div>
    	);
    }
}
export default Create_Student;