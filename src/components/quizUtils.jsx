export function calculateQuizResult(quizData, userAnswerData) {
  const correctAnswers = quizData.map(
    (question) => question.all_answers.find((answer) => answer.isCorrect).id
  );

  const userAnswers = userAnswerData.map((answer) => answer.id);

  const numberCorrect = correctAnswers.filter((answer) =>
    userAnswers.includes(answer)
  ).length;

  const result = `You scored ${numberCorrect} out of ${quizData.length} correct answers`;
  return result;
}
