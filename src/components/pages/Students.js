import React from 'react';
import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Student from "../ui/Student"
class Students extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			students: [],
			user_id:'',
			page:false,
			files:null
		}
		this.changePage = this.changePage.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.submitFile = this.submitFile.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	submitFile(e){
		e.preventDefault()
		const formData = new FormData();
		formData.append("file", this.state.file)
		formData.append("sd1_term", "summer")
		formData.append("sd1_year", '2019')

		console.log(formData)
    	axios.post('http://localhost:3001/api/studentUpload',  formData, { headers: { Authorization: `Bearer ${this.props.token}`, 'content-type': 'multipart/form-data'} })
        .then(res => {
           
           console.log(res.data);
         })
	}
	
	handleChange(e){
		e.preventDefault()
		this.setState({file:e.target.files[0]})
	}

    componentDidMount() {
    	if(this.props.students != null){
    		this.setState({students:this.props.students})
    	} else {
	    	const payload = {
				"user_id":this.props.user_id,
				"type":this.props.userType
			}
			console.log(payload)
	    	axios.post('http://localhost:3001/api/getAllStudents', payload)
	        .then(res => {
	            this.setState({students:res.data})
	            console.log(res.data);
	        })    	
    	}

    }
    changePage(event) {
		this.setState({
			user_id:event.target.id,
			page:true
		})
    }
	//GET ALL GROUPS FOR PARTICULAR COURSE FROM BACKEND
	//GET ALL GROUPS IN APP
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE
    render() {
    	console.log(this.state.students)
      	if(!this.state.page){        
      		return(
	        	<div>
	        		<Navbar>
	                	<Nav>
	                    	<LinkContainer to="/create_student">
	                     		<NavItem>Create New Student</NavItem>
	                    	</LinkContainer>
	                	</Nav>
	            	</Navbar>
		            <h1>All Students</h1>
		            <table>
		              	<thead>
		              		<tr>
		              			<th>First Name</th>
		              			<th>Last Name</th>
		              			<th>NID</th>
		              			<th>Email</th>
		              			<th>Team</th>
		              			<th></th>
		              		</tr>
		               	</thead>
		               	<tbody>
		               		{this.state.students.map(student =>
		               			<tr key={student.user_id}>
		               				<td>{student.first_name}</td>
		               				<td>{student.last_name}</td>
		               				<td>{student.nid}</td>
		               				<td>{student.email}</td>
		               				<td>{student.team}</td>
		               				<td><button id={student.user_id}name="View" onClick={this.changePage}>View</button></td>
		               			</tr>
		               		)}
		               	</tbody>
		            </table>
					
					
					<form onSubmit={this.submitFile}>
	            		<input name="file" type="file" onChange={this.handleChange}></input>
	           		 	<button>Submit</button>
	        		</form>
	            </div>
	        )
    	}
    	else if(this.state.page) {
    		return(    		
    			<Student student_id={this.state.user_id}/>
			)
    	}

    }
}
export default Students;