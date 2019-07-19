import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
            form_id:this.props.form_id,
            student_id:'13',
            token:'testToken',
            loading:false,
            title:'',
            type:'',
            data:[],
            results:[],
            requested:this.props.flag,
            form_retreived:false,
            form_submitted:false
        };
    
        this.handleChange1 = this.handleChange1.bind(this);
        this.requestForm = this.requestForm.bind(this);
        this.changePage = this.changePage.bind(this);
        this.questionHandler= this.questionHandler.bind(this);
        this.formHandler = this.formHandler.bind(this);
        this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
      }
    
    
    handleChange1(event){
        this.setState({
            form_id:event.target.value
        }) 
    }

    componentDidMount(){
            if(this.state.requested){
                const payload = {
                    form_id:this.state.form_id
                }
                axios.post(`http://localhost:3001/api/getForm`, payload)
                .then(response => this.changePage(response))
                .catch(function (error){console.log(error)})
            }
    }

    requestForm(event){
        event.preventDefault()
        const payload = {
            form_id: this.state.form_id
        }
        this.setState({loading:true})
        console.log(this.state.form_id)
        axios.post(`http://localhost:3001/api/getForm`, payload)
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
    }

    // handles sending the survey to the backend
    formHandler(event){
        event.preventDefault()
        const payload = {
            user_id:this.state.student_id,
            token:this.state.token,
            form_id:this.state.form_id,
            results:this.state.results,
            instance_id:this.props.instance_id    
        }
        console.log(payload)
        axios.post(`http://localhost:3001/api/submitForm`, payload)
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
        
        if(res.status===200 && typeof res.data.status === 'undefined'){
            const result = res.data
        
                console.log(res.data)
                this.setState({
                data:result,
                title:result[0].title,
                type:result[0].type,
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
                <h1>Request Survey/form (for testing purposes for now)</h1>
                <p> this isnt gonna be a thing in the final product though</p>
                <form onSubmit={this.requestForm}>
                    <label>Enter Form Id </label>
                    <input type="text" name="form_id" value={this.state.form_id} onChange={this.handleChange1}></input>
                    <button type="submit">Request Form/survey</button>
                </form>
                </div>
            )
        } else if(formStatus && !form_submitted){
            
            const title = this.state.title
            //var questions = this.props.questions;
            let questions = this.state.data
           //let {questions}= Array.from(this.state.data)
            return(
                <div>
                    <h1 className="header">{title} </h1>
                    <form onSubmit={this.formHandler}>

                        {questions.map((questions, i)=>  
                           <div className="yellow" key={i+1}>
                            <label name={"question" + i}>{(i +1) + ") " + questions.question_text}</label>
                            <br></br>
                            <input id={i} type="text" autoComplete="off" name={questions.question_id} value={this.state.results.value} onChange={this.questionHandler}/>
                            <br></br>
                            </div>
                       )}
                       
                        <button type="submit"> Submit </button>
                        
                    </form>
                </div>
            )
        } else if (form_submitted) {
            return(
                <h1>Survey Completed</h1>
            )
        }
      
    }
}

export default Survey