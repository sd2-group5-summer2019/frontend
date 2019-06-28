import React from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import "../../index.css";
import Select from 'react-select';

//NEED TO FIGURE OUT HOW TO ADD A SPONSOR FOR A TEAM
//HOW TO ADD STUDENTS TO A TEAM
class Create_Team extends React.Component {
	constructor(props) {
		super(props) 
		this.state = {
			project_name: '',
			description: '',
			sd1_semester: '',
			sd1_year: '',
			sd2_semester: '',
			sd2_year: '',
			sponsor: '',
			all_sponsors: [],
			success:false
		}

			this.changeHandler = this.changeHandler.bind(this)
			this.setSponsor = this.setSponsor.bind(this)
	        this.changePage = this.changePage.bind(this);
	        this.submitHandler = this.submitHandler.bind(this)

		}

    changeHandler(e) {
        this.setState({
            [e.target.name] :e.target.value
                      })
    }

    setSponsor(e) {
        this.state.sponsor = e.value
    }

    changePage = (response)=>{
        if(response.status===200){
            this.setState({success:true})
        }
        console.log(response.data);
    }

    submitHandler(e) {
        e.preventDefault();

        console.log(this.state)
        axios.post(`http://localhost:3001/api/create_team`, this.state)
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})
        alert("Form submitted");
        
    }

    componentDidMount() {
    axios.get('http://localhost:3001/api/get_all_sponsors')
        .then(res => {
        	this.state.all_sponsors = res.data;
        })

    }

    render(){
        if(this.state.success){
            return <Redirect to="/teams"/>
        }
    	return(
    		<div className="boxName" id="create_team">
    			<form method="post" name="createTeamForm" onSubmit={this.submitHandler}>
    				<label>Project Name</label>
    				<input type="text" name="project_name" value={this.state.project_name} onChange={this.changeHandler}/>
    				<br></br>
    				<label>Description</label>
    				<input type="text" name="description" value={this.state.description} onChange={this.changeHandler}/>
    				<br></br>
    				<label>Sponsor</label>
    				<Select 
    					options={this.state.all_sponsors.map(sponsor => ({ label:sponsor.company, value:sponsor.user_id }))} 
                        getOptionValue={({value}) => value}
                        onChange={({value}) => this.setSponsor({value})}
    				/>
    				<br></br>
    				<label>SD1 Information</label>
					<b>Spring</b>
	            	<input type="radio" name="sd1_semester" value={'SPRING'} onChange={this.changeHandler}/>
	            	<b>Summer</b>
	            	<input type="radio" name="sd1_semester" value={'SUMMER'} onChange={this.changeHandler}/>
	            	<b>Fall</b>
	            	<input type="radio" name="sd1_semester" value={'FALL'} onChange={this.changeHandler}/>
	            	<b>Year</b>
	            	<input type="text" pattern="^(19|20)\d{2}$" name="sd1_year" value={this.state.sd1_year} onChange={this.changeHandler}/>   
    				<br></br>
    				<label>SD2 Information</label>
					<b>Spring</b>
	            	<input type="radio" name="sd2_semester" value={'SPRING'} onChange={this.changeHandler}/>
	            	<b>Summer</b>
	            	<input type="radio" name="sd2_semester" value={'SUMMER'} onChange={this.changeHandler}/>
	            	<b>Fall</b>
	            	<input type="radio" name="sd2_semester" value={'FALL'} onChange={this.changeHandler}/>
	            	<b>Year</b>
	            	<input type="text" pattern="^(19|20)\d{2}$" name="sd2_year" value={this.state.sd2_year} onChange={this.changeHandler}/>   
	            	<br></br>
	            	<input type="submit" className="button" value="Create Team"/>
    			</form>
    		</div>
    	);
    }
}
export default Create_Team;