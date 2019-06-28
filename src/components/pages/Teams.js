import React from 'react';
import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";

class Teams extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			teams: []
		}
		this.deleteRequest = this.deleteRequest.bind(this);
		this.state.teams = [{id: "nid", project_name: "name", sponsor: "Heinrik", num_students: "5"}]

	}

    componentDidMount() {
    axios.get('http://localhost:3001/api/get_all_teams')
        .then(res => {
            this.state.teams = res.data;
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
	              			<th>Sponsor Name</th>
	              			<th>Number of Students</th>
	              			<th>Actions</th>
	              		</tr>
	               	</thead>
	               	<tbody>
	               		{this.state.teams.map(team =>
	               			<tr key={team.id}>
	               				<td>{team.project_name}</td>
	               				<td>{team.sponsor}</td>
	               				<td>{team.num_students}</td>
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

