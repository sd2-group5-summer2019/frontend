import React from 'react';
import axios from 'axios'

class Students extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			students: []
		}
		this.state.students = [{id: "nid", first_name: "mahzain", last_name: "malik", nid: "ma026001", email: "mahzain@knights.ucf.edu", team: "group 5"}]
	}

    componentDidMount() {
    	axios.get('http://localhost:3001/api/get_all_students')
        .then(res => {
            this.state.students = res.data;
        })
    }

    deleteRequest(id) {
		axios.post('http://localhost:3001/api/delete_user', id)
    	.catch(function (error){console.log(error)})
    }

    viewRequest(id) {

    }
	//GET ALL GROUPS FOR PARTICULAR COURSE FROM BACKEND
	//GET ALL GROUPS IN APP
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE
    render() {
        return(
        	<div>
	            <h1>All Students</h1>
	            <table>
	              	<thead>
	              		<tr>
	              			<th>First Name</th>
	              			<th>Last Name</th>
	              			<th>NID</th>
	              			<th>Email</th>
	              			<th>Team</th>
	              			<th>Actions</th>
	              		</tr>
	               	</thead>
	               	<tbody>
	               		{this.state.students.map(student =>
	               			<tr key={student.id}>
	               				<td>{student.first_name}</td>
	               				<td>{student.last_name}</td>
	               				<td>{student.nid}</td>
	               				<td>{student.email}</td>
	               				<td>{student.team}</td>
	               				<td>VIEW | EDIT | <button name="DELETE" onclick={() => this.deleteRequest(student.id)}>DELETE</button></td>
	               			</tr>
	               		)}
	               	</tbody>
	            </table>
            </div>
        );
    }
}
export default Students;

