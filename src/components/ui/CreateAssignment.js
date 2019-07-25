import React from "react";
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CreateInstance from "./CreateInstance";
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import {AssignContainer} from "../containers/GeneralContainer";

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
            ],
            asnwers:[],
            form_trigger:'',
            q_trigger:''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.addNewQuestion = this.addNewQuestion.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.answerKeyUi = this.answerKeyUi.bind(this);

      }
    
    // now that we're using react-bootstrap forms we dont really need this except for 
    // when there's a change the select element for picking the type of assignment the user is creating
    handleChange(){
        const type = document.getElementById('aselect').value
        console.log(document.getElementById('aselect').value)
        this.setState({
            type:type
        }) 
    }
    
    // since I have to user document.get I can't call the same function
    // for two different selection elements/ input
    handleQuestionTypeChange(){
        const q_type = document.getElementById('question_type').value
        this.setState({
            q_type:q_type
        })

    }

    answerKeyUi(){
        const q_type = this.state.q_type
        const q_num = this.state.q_num
        
        if(q_type === 'multiple_choice'){
            return(
                <div>
                <InputGroup className="mb-3">
                <InputGroup.Prepend >
                <InputGroup.Checkbox id="checkbox1" aria-label="checkbox1" />
                </InputGroup.Prepend>
                    <Form.Control id="text_input1" aria-label="text_input1" />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Checkbox id="checkbox2" aria-label="checkbox2" />
                </InputGroup.Prepend>
                    <Form.Control id="text_input2" aria-label="textInput2" />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Checkbox id="checkbox3" aria-label="checkbox3" />
                </InputGroup.Prepend>
                    <Form.Control id="text_input3" aria-label="textInput3" />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Checkbox id="checkbox4" aria-label="checkbox4" />
                </InputGroup.Prepend>
                    <Form.Control id="text_input4"aria-label="textInput4" />
                </InputGroup>
                
                </div>
            )
        }else if(q_type === 'fill_blank'){
            return(
                <Form.Group controlId="question_answer">
	                    <Form.Control size="lg" type="text" placeholder="Fill in answer here..." />
	            </ Form.Group>
            )
        }

        return(<p>free response</p>)
    }

  
    // adds new question to a preview array that contains only elements
    addNewQuestion(event){
        event.preventDefault()
        let assignmentType = this.state.type
        let questionList = this.state.questions
        let index = this.state.q_num + 1
        let qtext = document.getElementById('question_text').value
        let q_type = document.getElementById('question_type').value
        let previewt = this.state.preview
        let answerKey = []
        document.getElementById('question_text').value = ''
        
        questionList[index-1] = {
            'question_text':qtext,
            'question_type':q_type
        }
           
        // adds new question into a an array of dom elements so that 
        // i can then display it in the render method
      
        if(assignmentType === 'survey'){

            if(q_type === 'select'){
                 let qt = document.getElementById('question_trigger').value

                if(qt !== ''){
                    questionList[index -1].threshold = parseInt(qt)
                }
            }
            previewt.push(
                <ListGroup key={index}>
                    <ListGroup.Item> Question {(index) + ': ' + qtext}</ListGroup.Item>
                    <ListGroup.Item>{'(' + q_type + ')'}</ListGroup.Item>
                </ListGroup>          
        )
        }else if(assignmentType === 'quiz' && q_type === 'fill_blank'){

            answerKey[0] = document.getElementById('question_answer').value
            questionList[index -1].answer = answerKey
            previewt.push(
                <ListGroup key={index}>
                    <ListGroup.Item> Question {(index) + ': ' + qtext}</ListGroup.Item>
                    <ListGroup.Item>{'(' + q_type + ')'}</ListGroup.Item>
                    <ListGroup.Item>Answer: {answerKey}</ListGroup.Item>
                </ListGroup>          
            )
        }else if(assignmentType === 'quiz' && q_type === 'multiple_choice'){
           
            for(let i = 0; i<4; i++){
               console.log(document.getElementById(`checkbox${i+1}`).checked)
                answerKey[i] = {'answer': document.getElementById(`text_input${i+1}`).value, 
                                'isCorrect': document.getElementById(`checkbox${i+1}`).checked
                             }
            }
            questionList[index -1].answers = answerKey
            previewt.push(
                <ListGroup key={index}>
                    <ListGroup.Item> Question {(index) + ': ' + qtext}</ListGroup.Item>
                    <ListGroup.Item>{'(' + q_type + ')'}</ListGroup.Item>
                    <ListGroup.Item> Answer Choices </ListGroup.Item>
                    <ListGroup.Item>1. {answerKey[0].answer}  Correct?: {answerKey[0].isCorrect ? 'Yes': 'No'} </ListGroup.Item>
                    <ListGroup.Item>2. {answerKey[1].answer}  Correct?: {answerKey[1].isCorrect ? 'Yes': 'No'}</ListGroup.Item>
                    <ListGroup.Item>3. {answerKey[2].answer}  Correct?: {answerKey[2].isCorrect ? 'Yes': 'No'} </ListGroup.Item>
                    <ListGroup.Item>4. {answerKey[3].answer}  Correct?: {answerKey[3].isCorrect ? 'Yes': 'No'}</ListGroup.Item>
                </ListGroup>          
            )
            

        }


        this.setState({
                questions:questionList,
                q_num:index,
                preview:previewt,
                tempQ:'',
                
                      })
        console.log(questionList)
    }

    

    // handles sending the assignment to the backend
    formHandler(event){
        event.preventDefault()
            console.log(event.target.question_text.value)

        const payload = {
            access_level:'coordinator',
            type:this.state.type,
            user_id:this.state.user_id,
            token:this.state.token,
            title:event.target.title.value,
            description:event.target.description.value,
            questions:this.state.questions 
        }
        if(this.state.type ==='quiz'){
            let form_threshold = document.getElementById('form_threshold').value
            if(form_threshold !== ''){
                payload.form_threshold = parseInt(form_threshold)
            }
        }else{
            payload.form_threshold = null;
        }

        console.log(payload)
        axios.post(`http://` + this.props.ip_address + `:3001/api/createForm`, payload, {headers:{authorization:this.props.token}})
        .then(response => this.redirectOnSubmit(response))
        .catch(function (error){console.log(error)})
    }

    redirectOnSubmit(res){
        console.log(res.data.form_id)

        this.setState({
            loading:true
        })
       
        if(res.status===200){
            this.setState({
              form_status:true,
              form_submitted:true,
              form_id:res.data.form_id,
              loading:false
            })  
            console.log(this.state.form_id)
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
        const answerUi = this.answerKeyUi()

        if(!formStatus && !form_submitted){
            return(
             <div>
                 <h1>Create Assignment </h1>
                
                    <InputGroup >
                        <Form.Control id="aselect" onChange={this.handleChange} size="lg" as="select" >
                            <option value="survey"> Survey</option>
                            <option value="quiz"> Quiz</option>
                        </Form.Control>
                     </InputGroup>
                

               <br></br>

                <Form onSubmit={this.formHandler}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="title">
                            <Form.Label>Title</Form.Label>
	                        <Form.Control size="lg" type="text"/>
	                    </ Form.Group>

                        {assignmentType === 'quiz' ? 
                            <Form.Group as={Col} controlId="form_threshold">
                            <Form.Label>Add Form Trigger</Form.Label>
	                        <Form.Control size="lg" type="text" placeholder="Enter percentage" />
	                    </ Form.Group>
                        : ''}
                    </Form.Row>
                    <Form.Group controlId="description">
	                    <Form.Control size="lg" as="textarea" type="text" placeholder="Optional description..." />
	                </ Form.Group>

                    <div>
                         {preview} 
                    </div>

                    <Form.Group controlId="question_text" >
                        <Form.Label>Question {this.state.q_num + 1} text: </Form.Label>
	                    <Form.Control size="lg" as="textarea" placeholder=''></Form.Control>
	                </ Form.Group>
                    
                   <Form.Row>
                   <Form.Group as={Col} onChange={this.handleQuestionTypeChange} controlId="question_type">
                        <Form.Label>Question Type: </Form.Label>
	                    <Form.Control size="lg" as="select">
                            <option value="free_response">Free Response </option>
                            {assignmentType === 'survey' ?
                            <option value="select">Select 1-5</option>:  <option value="multiple_choice">Multiple Choice</option>}
                           <option value="fill_blank">Fill in the blank</option>
                        </Form.Control>
	                </ Form.Group>

                    {assignmentType === 'survey' && questionType === 'select' ? 
                         <Form.Group as={Col} controlId="question_trigger">
                         <Form.Label>Add Question Trigger</Form.Label>
                         <Form.Control size="lg" type="text" placeholder="Enter value 1-5" />
                     </ Form.Group>
                    
                    : '' }
                    </ Form.Row>
                    
                    {assignmentType === 'quiz' && questionType !== "free_response" ? <div> {answerUi}</div>: ''}

                   
                  
                    <br></br>
                    <Button type="button" onClick={this.addNewQuestion}>Add Question</Button>
                    <br></br>
                    <br></br>
                    <Button size="lg" variant="primary" type="submit">Create {this.state.type}</Button>
                    
                </Form>
                
                </div>
                
               
            )
        }  else {
            return(
             
                <AssignContainer form_id={this.state.form_id} /> 
            )
        }
      
    }
}

export default CreateAssignment;