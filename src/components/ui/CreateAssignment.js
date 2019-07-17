import React from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CreateInstance from "./CreateInstance";
import InputGroup from 'react-bootstrap/InputGroup';

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
            token:this.props.token,
            loading:false,
            type:'survey',
            q_num:0,
            questions:[],
            form_retreived:false,
            form_submitted:false,
            tempQ:'',
            q_type:'free_response',
            form_id:'',
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

    // adds new question to a preview array that contains only elements
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
            title:event.target.title.value,
            description:event.target.description.value,
            questions:this.state.questions 
        }
        console.log(payload)
        // axios.post(`http://localhost:3001/api/createForm`, payload)
        // .then(response => this.redirectOnSubmit(response))
        // .catch(function (error){console.log(error)})
    }

    redirectOnSubmit(res){
        console.log(res.data.form_id)
       
        if(res.status===200){
            this.setState({
              form_status:true,
              form_submitted:true,
              form_id:res.data.form_id
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


    
    resetForm(){
        this.setState({
            loading:false,
            title:'',
            q_num:1,
            questions:[],
            form_retreived:false,
            form_submitted:false,
            tempQ:'',
            q_type:'',
            form_id:'',
            preview:[
                <h3 key="0">Questions</h3>
            ]
        })
    }
    
    render(){

        const formStatus = this.state.form_retreived
        const form_submitted = this.state.form_submitted
        const preview = this.state.preview
        const assignmentType = this.state.type 
        const questionType = this.state.q_type

        if(!formStatus && !form_submitted){
            return(
             <div>
                 <h1>Create Assignment </h1>
                
                    <InputGroup>
                        <Form.Control onChange={this.handleChange} size="lg" as="select" >
                            <option>Select Assignment Type</option>
                            <option value="survey"> Survey</option>
                            <option value="quiz"> Quiz</option>
                        </Form.Control>
                     </InputGroup>
                

               <br></br>

                <Form onSubmit={this.formHandler}>
                    <Form.Group controlId="title">
	                    <Form.Control size="lg" type="text" placeholder="Title" />
	                </ Form.Group>

                    <Form.Group controlId="description">
	                    <Form.Control size="lg" as="textarea" type="text" placeholder="Optional description..." />
	                </ Form.Group>

                    
                 
                
                    <div>
                         {preview} 
                    </div>
                    <Form.Group controlId="question_text">
                        <Form.Label>Question {this.state.q_num + 1} text: </Form.Label>
	                    <Form.Control size="lg" type="text" placeholder="Optional description..." />
	                </ Form.Group>


                   
                   <Form.Group controlId="question_type">
                        <Form.Label>Question Type: </Form.Label>
	                    <Form.Control size="lg" as="select">
                            <option default value="free_response">Free Response </option>
                            <option value="select">Select 1-5</option>
                            <option value="multiple_choice">Multiple Choice</option>
                            <option value="fill_blank">Fill in the blank</option>
                        </Form.Control>
	                </ Form.Group>
                   
                  
                    <br></br>
                    <button onClick={this.addNewQuestion}>Add Question</button>
                    <br></br>
                    <br></br>
                    <Button size="lg" variant="primary" type="submit">Create {this.state.type}</Button>
                    
                </Form>
                
                </div>
                
               
            )
        }  else {
            return(
             
                     <CreateInstance form_id={this.state.form_id} />
            )
        }
      
    }
}

export default CreateAssignment;