import React from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
            user_id:this.props.user_id,
            token:'testToken',
            loading:false,
            title:'',
            type:'survey',
            q_num:0,
            description:'',
            questions:[],
            form_retreived:false,
            form_submitted:false,
            tempQ:'',
            q_type:'',
            preview:[
                <h3 key="0">Questions</h3>
            ]
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.questionHandler= this.questionHandler.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.addNewQuestion = this.addNewQuestion.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
      }
    
    // handles changes on the form on anything that is not a question
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        }) 
    }
    
    removeQuestion(event){
        event.preventDefault()
        let new_q_num = this.state.q_num -1
        let index = event.target.value

        console.log(typeof event.target.name)
        // let questionList = (this.state.questions).slice(index, 1)
        // let previewt = (this.state.preview).slice(index, 1)

        // this.setState({
        //     questions:questionList,
        //     q_num:new_q_num,
        //     preview:previewt,
        // })

    }

    addNewQuestion(event){
        event.preventDefault()
        let questionList = this.state.questions
        let index = this.state.q_num + 1
        let qtext = this.state.tempQ
        let q_type = this.state.q_type
        let previewt = this.state.preview
        questionList[index-1] = {
            question:qtext,
            type:q_type
        }
           
    
        previewt.push(
            <div  key={"question" + index}>
                    <label>Question {(index) + ': ' + qtext}</label>
            </div>
                    
        )

        this.setState({
                questions:questionList,
                q_num:index,
                preview:previewt,
                tempQ:''
                      })
        console.log(questionList)
    }

    questionHandler(event){
        
        let questiontext = event.target.value
        this.setState({
               tempQ:questiontext
                      })

      
    }

    // handles sending the assignment to the backend
    formHandler(event){
        event.preventDefault()
        const payload = {
            access_level:'coordinator',
            type:this.state.type,
            user_id:this.state.user_id,
            token:this.state.token,
            title:this.state.title,
            description:this.state.description,
            questions:this.state.questions 
        }
        console.log(payload)
        axios.post(`http://localhost:3001/api/createForm`, payload)
        .then(response => this.redirectOnSubmit(response))
        .catch(function (error){console.log(error)})
    }

    redirectOnSubmit(res){
        if(res.status===200){
            this.setState({
              form_status:true,
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

    // <label >Start Date </label>
    // <input type="date" name="start_date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.start_date} onChange={this.handleChange}></input>
    // <br></br>
    // <label>End Date</label>
    // <input type="date" name="end_date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.end_date} onChange={this.handleChange}></input>
    // <br></br>

    // <label>Alerts</label>
    // <select>
    //     <option>No Notification</option>
    //     <option>Below Certain Threshold</option>
    //     <option>Different Answers</option>
    // </select>
    
    resetForm(){
        this.setState({
            loading:false,
            title:'',
            type:'',
            q_num:1,
            description:'',
            questions:[],
            form_retreived:false,
            form_submitted:false,
            tempQ:'',
            q_type:'',
            preview:[
                <h3 key="0">Questions</h3>
            ]
        })
    }
    
    render(){

        const formStatus = this.state.form_retreived
        const form_submitted = this.state.form_submitted
        const preview = this.state.preview

        if(!formStatus && !form_submitted){
            return(
             <div>
                
                <h1 className="header"> Create a New Assignment </h1> 
                <h3> Assignment Type</h3>
                <select name="type" value={this.state.type} onChange={this.handleChange}>
                    <option value="survey">Survey</option>
                    <option value="quiz">Quiz</option>
                </select>
                <Form onSubmit={this.formHandler}>
                   

                    <label>Title: </label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                    <br></br>
                    <textarea style={{color:'black'}} name="description" value={this.state.description} onChange={this.handleChange} placeholder="Brief Description (optional)..."/>
                    <div>
                         {preview} 
                    </div>
                    <label>Question {this.state.q_num + 1}: </label>
                    <input name={this.state.q_num} value={this.state.tempQ} onChange={this.questionHandler} type="text" placeholder="Press Enter to add"></input>
                    <label>Question Type: </label>
                    <select name="q_type" value={this.state.q_type} onChange={this.handleChange}>
                        <option value="free_response">Free Response </option>
                        <option value="select">Select 1-5</option>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="fill_blank">Fill in the blank</option>
                    </select>
                  
                    <br></br>
                    <button onClick={this.addNewQuestion}>Add Question</button>
                    <br></br>
                    <Button variant="primary" type="submit">Create {this.state.type}</Button>
                    
                </Form>
                
                </div>
                
               
            )
        }  else if (form_submitted) {
            return(
               <div>
                   <h1>Assignment created</h1>
                   <button onClick={this.resetForm}>Create Another Assignment</button>
               </div>
            )
        }
      
    }
}

export default CreateAssignment;