import React from 'react';
import axios from 'axios';
import {LinkContainer} from "react-router-bootstrap";
import { Navbar, Nav, NavItem} from "react-bootstrap";
import Table from 'react-bootstrap/Table';

class Student extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			student_id:this.props.student_id,
			instances: [],
			student_name:'',
			instance_id:'',
			page:false,
			files:null
		}
		this.changePage = this.changePage.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

    componentDidMount() {
    	const payload = {
			"user_id":this.state.student_id
		}
		console.log(payload)
    	axios.post('http://localhost:3001/api/getInstances', payload)
        .then(res => {
        	const temp = []
        	for(var i = 0; i < res.data.length; i++){
        		//console.log(res.data[i])
        		console.log(this.state.student_id)
        		if(res.data[i].user_id && this.state.student_id === res.data[i].user_id.toString()) {
        			temp.push(res.data[i])
        		}
        	}
            this.setState({instances:temp})
            console.log(temp);
        })                        
        .catch(function(error){console.log(error)})

        axios.post("http://localhost:3001/api/getStudentName", payload)
        .then(res => {
        	this.setState({student_name:res.data.first_name + " " + res.data.last_name})
        	console.log(res.data)
        })                        
        .catch(function(error){console.log(error)})

    }
    changePage(event) {
		this.setState({
			instance:event.target.id,
		})
    }
	//GET ALL GROUPS FOR PARTICULAR COURSE FROM BACKEND
	//GET ALL GROUPS IN APP
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE
    render() {
    	if(!this.state.page){
        	return(
	        	<div>
		            <h1>{this.state.student_name}</h1>
		            <h2>Forms</h2>
            		<Table>
						<thead>
                            <tr>
                                <th>Name</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                         <tbody>
                             {this.state.instances.map(instance =>
                                <tr key={instance.instance_id}>
                                    <td>{instance.title}</td>
                                    <td>{instance.end_date}</td>
                                    <td>{instance.is_complete ? 'Completed' : 'Not Started' }</td>
                                    <td> <button id={instance.instance_id} title={instance.type} name={instance.description} value={instance.is_complete} onClick={this.changePage}>View Summary</button></td> 
                                </tr>
                            )}
                         </tbody>
                     </Table>    	            
              	</div>
        	)
    	}
    }
}
export default Student;