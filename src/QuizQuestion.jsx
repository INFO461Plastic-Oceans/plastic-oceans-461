import React, { Component } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';

class QuizQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAnswer: ""
        }
    }

    render() {
        return (
            <div id="question-container">
                <h2 id="quiz-title">{this.props.quizName}</h2>
                <p className="quiz-question">{this.props.currentQuestion}</p>
                <ListGroup className="quiz-options">
                    {this.props.currentAnswers.map((item, index) => {
                        return(
                            <ListGroupItem action className="quiz-answer" key={index} onClick={(e) => this.handleAnswerSelect(e)}>{item}</ListGroupItem>
                        );
                    })}
                </ListGroup>
                <button ref="nextButton" onClick={(e) => this.handleSubmitAnswer(e)} className="quiz-button-disabled">Submit</button>
            </div>
        );
    }

    handleSubmitAnswer(e) {
        this.props.submitAnswer(this.state.selectedAnswer);
    }

    // Selects the clicked answer
    handleAnswerSelect(e) {
        this.setState({
            selectedAnswer: e.target.textContent
        })
        var answerButtons = document.getElementsByClassName("quiz-answer")
        for (var i = 0; i < answerButtons.length; i++) {
            answerButtons[i].classList.remove("selected-answer");
        }
        e.target.classList.add("selected-answer");

        this.refs.nextButton.classList.add("quiz-button");
        this.refs.nextButton.classList.remove("quiz-button-disabled");
        this.refs.nextButton.removeAttribute("disabled");
    }
}

export default QuizQuestion;