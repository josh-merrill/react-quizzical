import { useState } from "react";
import { decode } from "html-entities";

export default function Answer(props) {
  const [selectedAnswerId, setSelectedAnswerId] = useState();
  const { quizData, selectAnswer, quizComplete, userAnswerData } = props;

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
      opacity: "0.5",
    },
  };

  function getStyle(answer, quizOver) {
    const { isCorrect, isSelected, id } = answer;
    return !isSelected && !quizOver
      ? undefined
      : isSelected && !quizOver
      ? styles.selected
      : quizOver && isCorrect
      ? styles.correct
      : isSelected && quizOver && !isCorrect
      ? styles.incorrect
      : !isSelected && quizOver && !isCorrect
      ? styles.inactive
      : undefined;
  }

  const questionElements = quizData.map((item, index) => {
    const answerElements = item.all_answers.map((answer, answerIndex) => {
      return (
        <button
          key={answer.id}
          onClick={() => {
            setSelectedAnswerId(answer.id);
            selectAnswer(answer.id, answer.parentElement);
          }}
          style={getStyle(answer, quizComplete)}
        >
          {decode(answer.option)}
        </button>
      );
    });

    return (
      <div className="question--container" key={index}>
        <p className="quiz--question">{decode(item.question)}</p>
        <div className="question--options">{answerElements}</div>
      </div>
    );
  });

  return <div>{questionElements}</div>;
}
