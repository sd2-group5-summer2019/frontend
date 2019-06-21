import React from 'react';
import {Redirect} from 'react-router-dom';
import './index.css';

class Courses extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			courses: []
		}
	}

	//TODO INSERT FUNCTION THAT GETS ALL COURSES FROM BACKEND
	//NEEDS TO GET COORDINATOR NAME FROM ID 
	//ADD BUTTONS FOR CREATE COURSE, EDIT, AND DELETE

	render() {
		return (
			<div>
				<h1>All Courses</h1>
				<table>
					<thead>
						<tr>
							<th>Coordinator</th>
							<th>Session</th>
							<th>Term</th>
							<th>Start Year</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.courses.map(course =>
							<tr key={course.id}>
								<td>{course.coordinator_name}</td>
								<td>{course.session}</td>
								<td>{course.term}</td>
								<td>{course.start_year}</td>
								<td>VIEW | EDIT | DELETE</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
export default Courses;