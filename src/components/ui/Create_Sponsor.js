import React from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import "../../index.css";
import Select from 'react-select';

//NEED TO FIGURE OUT HOW TO ADD A SPONSOR FOR A TEAM
//HOW TO ADD STUDENTS TO A TEAM
class Create_Sponsor extends React.Component {
	constructor(props) {
		super(props) 
		this.state = {
            company: '',
            first_name: '',
            last_name:'',
            email: '',
            team: '',
            all_teams: [],
			success:false
		}
			this.changeHandler = this.changeHandler.bind(this)
	        this.changePage = this.changePage.bind(this)
	        this.submitHandler = this.submitHandler.bind(this)
            this.setTeam = this.setTeam.bind(this)

	}
	
    setTeam(e) {
        this.state.team = e.value
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
        e.preventDefault();

        console.log(this.state)
        axios.post(`http://` + this.props.ip_address + `:3001/api/create_sponsor`, this.state, {headers:{authorization:this.props.token}})
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})
        alert("Form submitted");
        
    }

    componentDidMount() {
    axios.get(`http://` + this.props.ip_address + `:3001/api/get_all_teams`)
        .then(res => {
            this.state.all_teams = res.data;
        })
    }
    
    render(){
        if(this.state.success){
            return <Redirect to="/sponsors"/>
        }
    	return(
    		<div className="boxName" id="create_sponsor">
    			<form method="post" name="createSponsorForm" onSubmit={this.submitHandler}>
    				<label>Company</label>
    				<input type="text" name="company" value={this.state.company} onChange={this.changeHandler}/>
    				<br></br>
    				<label>First Name</label>
    				<input type="text" name="first_name" value={this.state.first_name} onChange={this.changeHandler}/>
    				<br></br>
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.changeHandler}/>
                    <br></br>   
                    <label>Email</label>
                    <input type="text" name="Email" value={this.state.email} onChange={this.changeHandler}/>
                    <br></br>
                    <label>Team</label>
                    <Select
                        options={this.state.all_teams.map(team => ({ label: team.project_name, value: team.id}))}
                        getOptionValue={({value}) => value}
                        onChange={({value}) => this.setTeam({value})}
                    />
    				<br></br> 				
	            	<input type="submit" className="button" value="Create_Team"/>
    			</form>
    		</div>
    	);
    }
}
export default Create_Sponsor;