import React from "react";
import axios from 'axios';


const Question = ({question="Title not available"})=> {
    return(
        <section>
            <h2>{question}</h2>
            <input name="answer" type="text"/>
        </section>
    )
 }

class Survey extends React.Component{
    static defaultProps = {
        questions : [
            {"question": "Survey Question 1"},
            {"question": "Survey Question 2"}
        ]
    }

    constructor(props) {
        super(props);
        this.state = {
            form_id:'',
            loading:false,
            questionList: [],
            form_retreived:false
        };
    
        this.handleChange1 = this.handleChange1.bind(this);
        this.requestForm = this.requestForm.bind(this);
        this.changePage = this.changePage.bind(this);
      }
    
    
    

    handleChange1(event){
        this.setState({
            form_id:event.target.value
        }) 
    }

    requestForm(event){
        event.preventDefault()
        this.setState({loading:true})
        console.log(this.state.form_id)
        axios.post(`http://localhost:3001/api/getSurvey`, this.state)
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})
    }

    changePage(res){
        if(res.status===200){
            this.setState({
                questionList:res.data,
                loading:false,
                form_retreived:true
            })
            console.log(res.data)
        }
        else
            console.log("Something went wrong")
    }
    // additional functions
    // SubmitForm()
    // handleChange2 for the answers to the survey questions

    render(){
        //question array is just for testing right now has hardcoded values (see default props above)
        const {questions} = this.props
        const formStatus= this.state.form_retreived
        

        if(!formStatus){
            return(
                <div>
                <h1>Request Survey/form (for testing purposes for now)</h1>
                <p> this isnt gonna be a thing in the final product though</p>
                <form onSubmit={this.requestForm}>
                    <label>Enter Form Id </label>
                    <input type="text" name="form_id" value={this.state.form_id} onChange={this.handleChange1}></input>
                    <button type="submit">Request Form/survey</button>
                </form>
                </div>
            )
        } else {
            return(
                <div>
                    <h1 className="header">Survey1</h1>
                    <form >
                        <div>
                        {questions.map((questions, i)=>
                            <Question key={i} question={questions.question} />  
                        )}
                        <button>Submit</button>
                        </div>
                    </form>
                </div>
            )
        } 
      
    }
}

export default Survey