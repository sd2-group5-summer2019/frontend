import React from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import './index.css';

//TODO: GET COORDINATOR_ID FIELD SOMEHOW
//FIGURE OUT WHAT TO DO WITH ID
class Create_Course extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			session: '',
			start_year: '',
			term: '',
			coordinator_id: '',
			success:false
		}
		this.changeHandler = this.changeHandler.bind(this)
        this.changePage = this.changePage.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
	}

    changeHandler(e) {
        this.setState({
            [e.target.name] :e.target.value
                      })
    }

    changePage = (response)=>{
        if(response.status===200){
            this.setState({success:true})
        }
        console.log(response.data);
    }

    submitHandler(e) {

    	this.start_year = new Date().getFullYear()
        e.preventDefault();

        console.log(this.state)
        axios.post(`http://localhost:3001/api/create_course`, this.state)
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})
        alert("Form submitted");
        
    }

    render() {
        if(this.state.success){
            return <Redirect to="/courses"/>
        }
        return(
        	<div className="boxThing" id="createCourse">
            	<h1>Create Course</h1>
            	<form method="post" name="createCourseForm" onSubmit={this.submitHandler}>
	            	<label>Session</label>
	            	<br></br>
	            	<b>Senior Design 1</b>
	            	<input type="radio" name="session" value={'SD1'} onChange={this.changeHandler}/>
	            	<b>Senior Design 2</b>
	            	<input type="radio" name="session" value={'SD2'} onChange={this.changeHandler}/>
	            	<br></br>

	            	<label>Term</label>
	            	<br></br>
	            	<b>Spring</b>
	            	<input type="radio" name="term" value={'SPRING'} onChange={this.changeHandler}/>
	            	<b>Summer</b>
	            	<input type="radio" name="term" value={'SUMMER'} onChange={this.changeHandler}/>
	            	<b>Fall</b>
	            	<input type="radio" name="term" value={'FALL'} onChange={this.changeHandler}/>
	            	<br></br>
	            	<input type="submit" className="button" value="Create Course"/>
        		</form>
    		</div>
        );
    }
}
export default Create_Course;
