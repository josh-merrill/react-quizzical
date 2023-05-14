import React, { useState } from "react"

export default function Quiz(props) {
    const [quizComplete, setQuizComplete] = useState(false)
    const [answers, setAnswers] = useState([])

    // Destructure all incoming props
    const { quizData, handleBtnClick, handleClick } = props

    const styles = {
        selected: {
            backgroundColor: "#D6DBF5",
            border: "1px solid #D6DBF5",
        },
        correct: {
            backgroundColor: "#94D7A2",
            border: "1px solid #94D7A2",
            pointerEvents: "none",
        },
        incorrect: {
            backgroundColor: "#F8BCBC",
            border: "1px solid #F8BCBC",
            pointerEvents: "none",
        },
        inactive: {
            color: "#4D5B9E",
            border: "1px solid #4D5B9E",
            pointerEvents: "none",
            opacity: ".5"
        }
    }

    function getStyle({ isCorrect, isSelected }, quizOver) {
        return !isSelected && !quizOver ? null
            : isSelected && !quizOver ? styles.selected
                : quizOver && isCorrect ? styles.correct
                    : isSelected && quizOver && !isCorrect ? styles.incorrect
                        : !isSelected && quizOver && !isCorrect ? styles.inactive
                            : null
    }

    const questionElements = quizData.map((item, index) => {
        const answerElements = item.all_answers.map((answer, answerIndex) => {
            return (
                <button
                    key={answer.id}
                    onClick={() => {
                        setAnswers([...answers, answer])
                        handleBtnClick(answer.id, answer.parentElement)
                    }}
                    style={getStyle(answer, quizComplete)}
                >
                    {answer.option}
                </button>
            )
        })

        return (
            <div className="question--container" key={index}>
                <p className="quiz--question">{item.question}</p>
                <div className="question--options">{answerElements}</div>
            </div>
        )
    })


    function handleCheckAnswers() {
        const correctAnswers = quizData.map((question) =>
            question.all_answers.find((answer) => answer.isCorrect).id
        )
        const userAnswers = answers.map((answer) => answer.id)
        const numberCorrect = correctAnswers.filter((answer) =>
            userAnswers.includes(answer)
        ).length
        const result = `You scored ${numberCorrect} out of ${quizData.length} correct answers`
        return <p className="quiz--score">{result}</p>
    }

    return (
        <section className="quiz--section">
            {questionElements}
            {!quizComplete ?
                <div className="quiz--results">
                    <button className="button--large" onClick={() => setQuizComplete(true)}>Check answers</button>
                </div> :
                <div className="quiz--results">
                    {handleCheckAnswers()}
                    <button className="button--large" onClick={handleClick}>Reset quiz</button>
                </div>
            }
        </section>
    )
}
