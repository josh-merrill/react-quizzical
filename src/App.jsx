import { useState, useEffect } from "react"
import Form from "./components/Form"
import Quiz from "./components/Quiz"
import Loader from "./components/Loader"
import { nanoid } from "nanoid"

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [userAnswerData, setUserAnswerData] = useState([])
  const [categories, setCategories] = useState([])
  const [inputValues, setInputValues] = useState({
    number: 5,
    category: "any",
    difficulty: "any",
    type: "any",
  })

  function setFetchParameters() {
    const { number, category, difficulty, type } = inputValues
    let baseUrl = `https://opentdb.com/api.php?amount=${number}`

    if (category != "any") {
      baseUrl += `&category=${category}`
    }
    if (difficulty != "any") {
      baseUrl += `&difficulty=${difficulty}`
    }
    if (type != "any") {
      baseUrl += `&type=${type}`
    }
    return baseUrl
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("https://opentdb.com/api_category.php")
      const data = await response.json()
      setCategories(data.trivia_categories)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const res = await fetch(setFetchParameters())
      const data = await res.json()

      if (data.response_code !== 0) {
        setIsLoading(false)
        alert(
          `No Results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.) Please fix the errors in the form and resubmit.`
        )
      }

      const dataArray = data.results
      setQuizData(
        dataArray.map((item) => ({
          category: item.category,
          type: item.type,
          difficulty: item.difficulty,
          question: item.question,
          correct_answer: item.correct_answer,
          incorrect_answers: item.incorrect_answers,

          all_answers: randomizedArray([
            item.correct_answer,
            ...item.incorrect_answers,
          ]).map((option, index) => ({
            id: nanoid(),
            option: option,
            isCorrect: option === item.correct_answer,
            isSelected: false,
            parentElement: item.question,
          })),
        }))
      )
    }

    setIsLoading(false)

    if (quizStarted) {
      fetchData()
    }
  }, [quizStarted])

  function randomizedArray(array) {
    const length = array.length;
    const randomizedArr = new Array(length);

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      randomizedArr[i] = randomizedArr[randomIndex];
      randomizedArr[randomIndex] = temp;
    }

    return randomizedArr;
  }

  function handleChange(event) {
    const { name, value, type } = event.target
    setInputValues((previousValues) => ({
      ...previousValues,
      [name]: type === "number" ? getNumberValue(value) : value,
    }))
  }

  function getNumberValue(value) {
    const numberValue = Number(value)
    return numberValue > 50 ? 50 : numberValue < 1 ? 1 : numberValue
  }

  function toggleQuizStarted() {
    setQuizStarted((prevState) => !prevState)
  }

  function selectAnswer(id, parent) {
    setQuizData((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        all_answers: question.all_answers.map((answer) => {
          return answer.parentElement === parent
            ? {
                ...answer,
                isSelected: answer.id === id ? !answer.isSelected : false,
              }
            : answer
        }),
      }))
    )
  }

  useEffect(() => {
    setUserAnswers()
  }, [quizData])

  function setUserAnswers() {
    const selectedAnswers = []
    quizData.forEach((question) => {
      question.all_answers.forEach((answer) => {
        if (answer.isSelected) {
          selectedAnswers.push(answer)
        }
      })
    })
    setUserAnswerData(selectedAnswers)
  }

  return (
    <main className="main--app">
      {isLoading && quizData.length === 0 ? (
        <Loader isLoading={isLoading} />
      ) : quizStarted && quizData.length > 0 ? (
        <Quiz
          quizData={quizData}
          handleClick={toggleQuizStarted}
          selectAnswer={selectAnswer}
          userAnswerData={userAnswerData}
        />
      ) : (
        <Form
          categories={categories}
          handleClick={toggleQuizStarted}
          inputValues={inputValues}
          getNumberValue={getNumberValue}
          handleChange={handleChange}
        />
      )}
      <div className="blob--top"></div>
      <div className="blob--bottom"></div>
    </main>
  )
}
