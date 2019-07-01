import React from "react";
import axios from 'axios';
import "../../index.css";

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
            user_id:'13',
            token:'testToken',
            loading:false,
            title:'',
            type:'survey',
            q_num:0,
            description:'',
            questions:[],
            start_date:'',
            end_date:'',
            form_retreived:false,
            form_submitted:false,
            tempQ:'',
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
        let previewt = this.state.preview
        questionList[index-1] = {
            question:qtext
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

        console.log(event.target.value)
    }

    // handles sending the assignment to the backend
    formHandler(event){
        event.preventDefault()
        const payload = {
            access_level:this.props.userType,
            type:this.state.type,
            user_id:this.state.user_id,
            token:this.state.token,
            title:this.state.title,
            description:this.state.description,
            start_date:this.state.start_date,
            end_date:this.state.end_date,
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

    
    resetForm(){
        this.setState({
            loading:false,
            title:'',
            type:'Survey',
            q_num:1,
            description:'',
            questions:[],
            start_date:'',
            end_date:'',
            form_retreived:false,
            form_submitted:false,
            tempQ:'',
            preview:[]
        })
    }
    
    render(){

        const formStatus = this.state.form_retreived
        const form_submitted = this.state.form_submitted
        const preview = this.state.preview

        if(!formStatus && !form_submitted){
            return(
            <div>
                
                <h1 className="header">Create a New Assingment</h1>
                    <div  style={{margin:"auto"}}>
                <h1> Assignment Type : {this.state.type}</h1>
                <form onSubmit={this.formHandler}>
                    <label>Title: </label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
                    <br></br>
                    <label >Start Date </label>
                    <input type="date" name="start_date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.start_date} onChange={this.handleChange}></input>
                    <br></br>
                    <label>End Date</label>
                    <input type="date" name="end_date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value={this.state.end_date} onChange={this.handleChange}></input>
                    <br></br>
                    <br></br>
                    <textarea style={{color:'black'}} name="description" value={this.state.description} onChange={this.handleChange} placeholder="Brief Description (optional)..."/>
                    <div>
                         {preview} 
                    </div>
                    <label>Question {this.state.q_num + 1}: </label>
                    <input name={this.state.q_num} value={this.state.tempQ} onChange={this.questionHandler} type="text" placeholder="Press Enter to add"></input>
                    <br></br>
                    <button style={{display:'none'}} onClick={this.addNewQuestion}>Add Question</button>
                    <br></br>
                    <button type="submit">Create {this.state.type}</button>
                    
                </form>
                </div>
                
                </div>
            )
        }  else if (form_submitted) {
            return(
               <div>
                   <h1>Assignment created</h1>
                   <button onClick={this.resetForm}>Create Another Assignment</button>
                   <button>Assignments Page</button>
               </div>
            )
        }
      
    }
}

export default CreateAssignment;