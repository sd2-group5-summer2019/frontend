import React from 'react';
import axios from 'axios'

class Get_Results extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userid: '',
			formid: '',
			type: '',
			results: [],
			success:false
		}
			this.changeHandler = this.changeHandler.bind(this)
	        this.changePage = this.changePage.bind(this);
	        this.submitHandler = this.submitHandler.bind(this)
	        //this.state.type = "type"
	        //this.state.results = [{question:'q1', answer:'a1'}, {question:'q2', answer:'a2'}, {question:'q3', answer:'a3'}]
	}

	componentDidMount(){
		if(this.props.form_id){
			this.setState({
				formid:this.props.form_id
			})
		}
		
	}
	changeHandler(e) {
		this.setState({
		[e.target.name] :e.target.value
	    	})
	}
    changePage = (response)=>{
        if(response.status===200){
            this.setState({
            	//type: response.data.type,
				results: response.data,
				success:true
            })
        }
        console.log(response.data.questions);
    }
    submitHandler(e) {
        e.preventDefault();

        console.log(this.state)
        axios.post(`http://localhost:3001/api/getAnswers`, this.state)
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})
    }
    render(){
    		return(
    			<div className="boxName" id="/get_results">
					
    				<form method="post" name="getResults" onSubmit={this.submitHandler}>
	    				<label>USER ID
	    					<input type="text" name="userid" value={this.state.userid} onChange={this.changeHandler}/>
	    				</label>
	    				<br></br>
	    				<label>SURVEY ID
	    					<input type="text" name="formid" value={this.state.formid} onChange={this.changeHandler}/>
	    				</label>
	    				<br></br>
	    				<input type="submit" className="button" value="Get Survey Results"/>
    				</form>
    				<br></br>
    				{!this.state.success ? null : (
    				<div><h1>Survey Results</h1>
		            <table>
		              	<thead>
		              		<tr>
		              			<th>Questions</th>
		              			<th>Answers</th>

		              		</tr>
		               	</thead>
		               	<tbody>
		               		{this.state.results.map(result =>
		               			<tr key={result.question_text}>
		               				<td>{result.question_text}</td>
		               				<td>{result.answer_text}</td>
		               			</tr>
		               		)}
		               	</tbody>
		            </table></div>
		        )}
    			</div>
    		);

    }
}
export default Get_Results;