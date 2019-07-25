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
			
		}
		this.changePage = this.changePage.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		// this.state.teams = [{id: "nid", project_name: "name", sponsor: "Heinrik", num_students: "5"}]

	}

    componentDidMount() {
		
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
	            </div>
	        );		
    	} else if(this.state.page) {
    		return(<Students students={this.state.students}/>)
    	}

    }
}
export default Teams;

