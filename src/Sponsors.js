import React from 'react';
import axios from 'axios'

class Sponsors extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sponsors: []
		}
		//this.deleteRequest.bind(this);
		this.state.sponsors = [{id: "nid", first_name: "mahzain", last_name: "malik", company: "ma026001", email: "mahzain@knights.ucf.edu", team: "group 5"}]
	}

    componentDidMount() {
    	axios.get('http://localhost:3001/api/get_all_sponsors')
        .then(res => {
            this.state.sponsors = res.data;
        })
    }

    deleteRequest(id) {
    	axios.post('http://localhost:3001/api/delete_user', id)
        .catch(function (error){console.log(error)})
    }
	//GET ALL GROUPS FOR PARTICULAR COURSE FROM BACKEND
	//GET ALL GROUPS IN APP
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE
    render() {
        return(
        	<div>
	            <h1>All Sponsors</h1>
	            <table>
	              	<thead>
	              		<tr>
	              			<th>First Name</th>
	              			<th>Last Name</th>
	              			<th>Company</th>
	              			<th>Email</th>
	              			<th>Team</th>
	              			<th>Actions</th>
	              		</tr>
	               	</thead>
	               	<tbody>
	               		{this.state.sponsors.map(sponsor =>
	               			<tr key={sponsor.id}>
	               				<td>{sponsor.first_name}</td>
	               				<td>{sponsor.last_name}</td>
	               				<td>{sponsor.company}</td>
	               				<td>{sponsor.email}</td>
	               				<td>{sponsor.team}</td>
	               				<td>VIEW | EDIT | <button name="DELETE" onclick={() => this.deleteRequest(sponsor.id)}>DELETE</button></td>
	               			</tr>
	               		)}
	               	</tbody>
	            </table>
            </div>
        );
    }
}
export default Sponsors;

