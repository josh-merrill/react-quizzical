import { useState } from "react"
import Answer from "./Answer"
import { calculateQuizResult } from "./quizUtils"

export default function Quiz(props) {
  const [quizComplete, setQuizComplete] = useState(false)

  const { quizData, handleClick, selectAnswer, userAnswerData } = props

  function handleCheckAnswers() {
    const result = calculateQuizResult(quizData, userAnswerData)
    return <p className="quiz--score">{result}</p>
  }

  return (
    <section className="quiz--section">
      <Answer
        quizData={quizData}
        userAnswerData={userAnswerData}
        selectAnswer={selectAnswer}
        quizComplete={quizComplete}
      />
      {!quizComplete ? (
        <div className="quiz--results">
          <button
            className={"button--large"}
            onClick={() => {setQuizComplete(true)}}
            disabled={userAnswerData.length === quizData.length ? false : true}
          >
            Check answers
          </button>
        </div>
      ) : (
        <div className="quiz--results">
          {handleCheckAnswers()}
          <button className="reset button--large" onClick={handleClick}>
            Reset quiz
          </button>
        </div>
      )}
    </section>
  )
}
