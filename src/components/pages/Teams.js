import React from 'react';
import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Students from "../pages/Students"
class Teams extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user_id:this.props.user_id,
			teams: [],
			students:[],
			page:false
			files:null
		}
		this.changePage = this.changePage.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.submitFile = this.submitFile.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	submitFile(e){
		e.preventDefault()
		const formData = new FormData();
		formData.append("file", this.state.file)
		formData.append("sd1_term", "summer")
		formData.append("sd1_year", '2019')

		console.log(formData)
		axios.post(`http://` + this.props.ip_address + `:3001/api/teamUpload`,  formData, {headers:{authorization:this.props.token}})
	    .then(res => {
	       
	       console.log(res.data);
	     })
	}

	handleChange(e){
		e.preventDefault()
		this.setState({file:e.target.files[0]})
	}
		
	const payload ={'user_id':this.state.user_id}
	console.log(payload)
    axios.post(`http://` + this.props.ip_address + `:3001/api/getAllTeams`, payload, {headers:{authorization:this.props.token}})
        .then(res => {
			console.log(res.data)
           this.setState({
			   teams:res.data.team
		   }) 
        })
	}
	
	changePage(event) {
		axios.post(`http://` + this.props.ip_address + `:3001/api/getTeamMembers`, {team_id:event.target.id}, {headers:{authorization:this.props.token}})
			.then(res => {
				console.log(res.data)
				this.setState({
					students:res.data.team_members,
					page:true
				})
		})
	}
	//GET ALL GROUPS IN APP
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE
    render() {
		const teams = this.state.teams
		if(!this.state.page) {
	        return(
	        	<div>
	        		<Navbar>
	                	<Nav>
	                    	<LinkContainer to="/create_team">
	                     		<NavItem>Create New Team</NavItem>
	                    	</LinkContainer>
	                	</Nav>
	            	</Navbar>
		            <h1>All Teams</h1>
		            <table>
		              	<thead>
		              		<tr>
		              			<th>Project Name</th>
		              			<th></th>
		              		</tr>
		               	</thead>
		               	<tbody>
		               		{teams.map(team =>
		               			<tr key={team.team_id}>
		               				<td>{team.project_title}</td>
		               				<td><button id={team.team_id} onClick={this.changePage}>View</button></td>
		               			</tr>
		               		)}
		               	</tbody>
		            </table>

						<form onSubmit={this.submitFile}>
		            		<input name="file" type="file" onChange={this.handleChange}></input>
		           		 	<button>Submit</button>
		        		</form>	            
	        		</div>
	        );		
    	} else if(this.state.page) {
    		return(<Students students={this.state.students}/>)
    	}

    }
}
export default Teams;

