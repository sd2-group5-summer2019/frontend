import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from "react-bootstrap/FormGroup";
import {Card, Button } from "react-bootstrap";
import { apiCall } from "./UploadFile";


class Survey extends React.Component{
   

    constructor(props) {
        super(props);
        this.state = {
            form_id:this.props.form_id,
            student_id:this.props.user_id,
            token:this.props.token,
            loading:false,
            title:'',
            type:'',
            data:[],
            results:[],
            form_retreived:false,
            form_submitted:false
        };
    
        this.handleChange1 = this.handleChange1.bind(this);
        this.requestForm = this.requestForm.bind(this);
        this.changePage = this.changePage.bind(this);
        this.questionHandler= this.questionHandler.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.inputBox = this.inputBox.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.filterQuizQuestions = this.filterQuizQuestions.bind(this);
      }
    
    
    handleChange1(event){
        this.setState({
            form_id:event.target.value
        }) 
    }

    // returns input element that best matches the question type
    inputBox(question, i){

        let element = <p></p>

        switch(question.question_type){

            case 'fill_blank':
                    element = <input className="form-control" id={i} type="text" autoComplete="off" name={question.question_id} value={this.state.results.value} onChange={this.questionHandler}/>
            break;
            case 'select':
                    element =  <Container>
                                    <Row className="justify-content-sm-center">
                                        <Col><label> 1 </label></Col> <Col><label> 2 </label></Col> <Col><label> 3 </label></Col> <Col><label> 4 </label></Col> <Col><label> 5 </label></Col>
                                    </Row>
                                    <Row className="justify-content-md-center">   
                                            <Col> <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={1}/> </Col>
                                            <Col> <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={2}/> </Col>
                                            <Col> <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={3}/> </Col>
                                            <Col> <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={4}/> </Col>
                                            <Col> <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={5}/> </Col>
                                    </Row>
                            </Container>
            break;
            case 'multiple_choice':
                    element =   <div>
                                    <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={question.answers[0].answer_text }/> <label>{question.answers[0].answer_text }</label><br></br>
                                    <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={question.answers[1].answer_text }/> <label>{question.answers[1].answer_text }</label><br></br>
                                    <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={question.answers[2].answer_text}/> <label>{question.answers[2].answer_text }</label><br></br>
                                    <input type="radio" id={i} onChange={this.questionHandler} name={question.question_id} value={question.answers[3].answer_text}/> <label>{question.answers[3].answer_text }</label><br></br>
                                </div>
                  
            break;
            case 'free_response':
                    element =  <textarea className="form-control" id={i} type="input" autoComplete="off" name={question.question_id} value={this.state.results.value} onChange={this.questionHandler}/>
            break;
        }

        return element
       
    }

    componentDidMount(){
                
                const payload = {
                    form_id:this.state.form_id
                }
                
                axios.post(`http://localhost:3001/api/getForm`,  payload, { headers: { Authorization: `Bearer ${this.state.token}` } })
                .then(response => this.changePage(response))
                .catch(function (error){console.log(error)})
              
    }

    requestForm(event){
        event.preventDefault()
        const header =`Authorization:Bearer ${this.state.token}`
        const payload = {
            form_id: this.state.form_id
        }
        this.setState({loading:true})
        console.log(this.state.form_id)
        axios.post(`http://localhost:3001/api/getForm`,  payload, { headers: { Authorization: `Bearer ${this.state.token}` } })
        .then(response => this.changePage(response))
        .catch(function (error){console.log(error)})

    }

    questionHandler(event){

        let results = this.state.results

        results[event.target.id] = {
            question_id:event.target.name,
            text:event.target.value
        } 
        
        this.setState({
                results:results
                      })
        console.log(results)
    }

    // handles sending the survey to the backend
    formHandler(event){
        event.preventDefault()
        const payload = {
            user_id:this.state.student_id,
            form_id:parseInt(this.state.form_id),
            results:this.state.results,
            instance_id:this.props.instance_id    
        }
        console.log(payload)
        axios.post(`http://localhost:3001/api/submitForm`, payload, { headers: { Authorization: `Bearer ${this.state.token}` } })
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

    // formats the response from the backend into something the frontend can 
    // use for when it sends back multiple choice questions
    filterQuizQuestions(data){
        console.log(data)
        let tempData = {}
        let answers = []
        
        if(data.quiz !== undefined){
            tempData={questions:[]}

            if(data.quiz.length > 0){

                tempData.title = data.quiz[0].title
                tempData.type = data.quiz[0].type
                let q_id = ''
                let q_id_index = 0
                let answer_index = 0
                let index = 0
                

                while(index < data.quiz.length){
                    if(q_id === data.quiz[index].question_id){

                        if(data.quiz[index].question_type === 'multiple_choice'){
                            tempData.questions[q_id_index].answers[answer_index] = {answer_text:data.quiz[index].key_text}
                        }
                        answer_index ++;
                        index++;
                    }else{
                        q_id = data.quiz[index].question_id
                        q_id_index = index
                        tempData.questions[index]={
                            question_id : data.quiz[index].question_id,
                            question_text : data.quiz[index].question_text,
                            question_type : data.quiz[index].question_type,
                            answers
                        }

                        if(data.quiz[index].question_type === 'multiple_choice'){
                            tempData.questions[index].answers = [{answer_text:data.quiz[index].key_text}]
                        }

                        answer_index=1
                        index++;
                    }
                }
                console.log(tempData)
                return tempData
            }
            console.log(data.quiz)
            
        }else if(data.survey !== undefined)
        {
            if(data.survey.length > 0){
                tempData.title = data.survey[0].title
                tempData.type = data.survey[0].type
               
                tempData.questions = data.survey
                return tempData                
            }
            return[{"error":"Assignment has no questions"}]
        }
        return [{"title":"no such assignment exists"}];
    }


    // processes the response from the form request
    // stores the questions array in data
    // changes form_retrieved to true so render can load the
    // survey form to the page 
    changePage(res){
        
        if(res.status===200 && typeof res.data.status === 'undefined'){
            const result = this.filterQuizQuestions(res.data)
        
                
                this.setState({
                data:result,
                title:result.title,
                type:result.type,
                loading:false,
                form_retreived:true
                })
            
            
        }
        else
            console.log(res.data.status)
    }

    

    render(){
        //question array is just for testing right now has hardcoded values (see default props above)
       ///const {questions} = this.props
        const formStatus = this.state.form_retreived
        const form_submitted = this.state.form_submitted
        
        
        if(!formStatus){
            return(
                
                <div>
             
                </div>
            )
        } else if(formStatus && !form_submitted && this.state.data.questions !== undefined){
            
            const title = this.state.title
            //var questions = this.props.questions;
            let questions = this.state.data.questions
           //let {questions}= Array.from(this.state.data)
            return(
                <Card>
                    <Card.Header as="h1">{title} </Card.Header>
                    <Card.Body>
                        <Card.Text>Description</Card.Text>
                        <ListGroup>
                   
                                <ListGroup.Item></ListGroup.Item>
                                    {questions.map((question, i)=>  

                                        <ListGroup.Item key={i+1}>
                           
                                        <label name={"question" + i}>{(i +1) + ") " + question.question_text}</label>
                                        <br></br>
                                        {this.inputBox(question, i)}
                            
                                        <br></br>
                                        </ListGroup.Item>
                                    )}

                                <ListGroup.Item> <center><Button size="lg" type="submit" onClick={this.formHandler}> Submit {this.state.type} </Button></center></ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                   
            )
        } else if (form_submitted) {
            return(
                <Card>
                    <Card.Body><h1>Survey Completed</h1></Card.Body>
                </Card>
                
            )
        }
        else{
           return( <div>something went wrong...</div>)
        }
      
    }
}

export default Survey