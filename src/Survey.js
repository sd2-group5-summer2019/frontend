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
    render(){
        const {questions} = this.props
        return(
            <div>
                <h1 className="header">Survey1</h1>
                <form>
                    <div>
                    {questions.map(questions =>
                        <Question question={questions.question} />  
                    )}
                    <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Survey