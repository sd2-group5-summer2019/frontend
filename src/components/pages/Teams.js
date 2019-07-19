import React from 'react';
import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";

class Teams extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user_id:this.props.user_id,
			teams: []
			
		}
		this.deleteRequest = this.deleteRequest.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		// this.state.teams = [{id: "nid", project_name: "name", sponsor: "Heinrik", num_students: "5"}]

	}

    componentDidMount() {
		
	const payload ={user_id:this.state.user_id}
    axios.post('http://localhost:3001/api/getAllTeams', payload)
        .then(res => {
			console.log(res.data)
           this.setState({
			   teams:res.data.result
		   }) 
        })
	}
	
    deleteRequest(id) {
    	axios.post('http://localhost:3001/api/delete_team', id)
        .catch(function (error){console.log(error)})
    }	
    //GET ALL GROUPS FOR PARTICULAR COURSE FROM BACKEND
	//GET ALL GROUPS IN APP
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE
    render() {
		const teams = this.state.teams
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
	              			<th>Actions</th>
	              		</tr>
	               	</thead>
	               	<tbody>
	               		{teams.map(team =>
	               			<tr key={team.team_id}>
	               				<td>{team.project_title}</td>
	               				<td>VIEW | EDIT | <button name="DELETE" onClick={() => this.deleteRequest(team.id)}>DELETE</button></td>
	               			</tr>
	               		)}
	               	</tbody>
	            </table>
            </div>
        );
    }
}
export default Teams;

