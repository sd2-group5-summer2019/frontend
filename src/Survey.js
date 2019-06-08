import React from "react";



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
    
    state = {
        form_id:'',
        loading:false,
        questionList: [],
        form_retreived:false
    }

    render(){
        const {questions} = this.props
        const formStatus= this.state.form_retreived
        if(!formStatus){
            return(
                <div>
                <h1>Request Survey/form (for testing purposes for now)</h1>
                <p> this isnt gonna be a thing in the final product though</p>
                <form>
                    <label>Enter Form Id </label>
                    <input type="text"/>
                    <button>Request Form/survey</button>
                </form>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1 className="header">Survey1</h1>
                    <form>
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