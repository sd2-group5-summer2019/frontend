import React from "react";
import axios from 'axios';

class CreateAssignment extends React.Component{
    static defaultProps = {
        questions : [
            {"question": "Survey Question 1"},
            {"question": "Survey Question 2"}
        ]
    }

    constructor(props) {
        super(props);
        this.state = {
            user_id:'2',
            token:'testToken',
            loading:false,
            title:'',
            type:'Survey',
            q_num:1,
            questions:{},
            form_retreived:false,
            form_submitted:false,
            tempQ:''
        };
    
        this.handleChange1 = this.handleChange1.bind(this);
        this.changePage = this.changePage.bind(this);
        this.questionHandler= this.questionHandler.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.addNewQuestion = this.addNewQuestion.bind(this);
      }
    
    
    handleChange1(event){
        this.setState({
            title:event.target.value
        }) 
    }
    addNewQuestion(event){
        event.preventDefault()
        let questions = this.state.questions
        let index = this.state.q_num 
        let qtext = this.state.tempQ

        questions[index - 1] = {
            text:qtext,
            type:'default'
        } 
        
        this.setState({
                questions:questions,
                q_num:index + 1
                      })
        console.log(questions)
    }

    questionHandler(event){
      
        let questiontext = event.target.value
        this.setState({
               tempQ:questiontext
                      })

        console.log(event.target.value)
    }

    // handles sending the survey to the backend
    formHandler(event){
        event.preventDefault()
        const payload = {
            user_id:this.state.user_id,
            token:this.state.token,
            //title and description to be added
            questions:this.state.questions 
        }
        console.log(payload)
        axios.post(`http://localhost:3001/api/frontendTest`, payload)
        .then(response => this.redirectOnSubmit(response))
        .catch(function (error){console.log(error)})
    }

    redirectOnSubmit(res){
        if(res.status===200){
            this.setState({
              form_submitted:true
            })  
            console.log(res.data)
        }
        else
            console.log("Something went wrong")
    }

    // processes the response from the form request
    // stores the questions array in data
    // changes form_retrieved to true so render can load the
    // survey form to the page 
    changePage(res){
        if(res.status===200){
            this.setState({
                data:res.data.questions,
                title:res.data.title,
                type:res.data.type,
                loading:false,
                form_retreived:true
            })
            console.log(res.data.questions)
        }
        else
            console.log("Something went wrong")
    }

    

    render(){

        const formStatus = this.state.form_retreived
        const form_submitted = this.state.form_submitted
        const questions = Array.from(this.state.questions);

        if(!formStatus && !form_submitted){
            return(
                <div>
                <h1>Create a New Assingment</h1>
                <p> Type: {this.state.type}</p>
                <form>
                    <label>Title</label>
                    <br></br>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange1}></input>
                    <br></br>
                    <br></br>
                    <textarea placeholder="Brief Description (optional)..."></textarea>
                    <br></br>
                    <label>Question {this.state.q_num}: </label>
                    <input name={this.state.q_num} value={this.state.tempQ.value} onChange={this.questionHandler} type="text"></input>
                    <br></br>
                    <button onClick={this.addNewQuestion}>Add Question</button>
                    <br></br>
                        {questions.map((questions)=>  
                        
                            <li name={"question"}> { ") " + questions.text}</li>
                          
                        )}
                    <br></br>
                    <button type="submit">Create {this.state.type}</button>
                </form>
                </div>
            )
        }  else if (form_submitted) {
            return(
                <h1>Assignment Created</h1>
            )
        }
      
    }
}

export default CreateAssignment;