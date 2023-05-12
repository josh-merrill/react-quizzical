import React, { useState, useEffect } from 'react'
import Form from "./components/Form"
import Quiz from "./components/Quiz"

export default function App() {

    // Initialize state for Quizzical
    const [quizData, setQuizData] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)
    const [categories, setCategories] = useState([])
    const [inputValues, setInputValues] = useState({
        number: 5,
        category: "any",
        difficulty: "any",
        type: "any"
    })

    // Handle API side effects and setQuizData state using the Open Trivia DB endpoint
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(setFetchParameters())
            const data = await res.json()

            // How could I update this so that I get the right error message and then be able to render that to the page so the user is alerted?
            if (data.response_code !== 0) {
                console.log(data.response_code)
                alert(`Please fix the errors in the form and resubmit.`)
            }

            const dataArray = data.results
            setQuizData(dataArray.map(item => ({
                category: item.category,
                type: item.type,
                difficulty: item.difficulty,
                question: item.question,
                correct_answer: item.correct_answer,
                incorrect_answers: item.incorrect_answers,

                // Store all questions, map over them and pass information that corresponds to each correct answer and question
                all_answers: randomizedArray([item.correct_answer, ...item.incorrect_answers]).map((option, index) => ({
                    id: index,
                    option: option,
                    isCorrect: option === item.correct_answer,
                    isSelected: false,
                    parentElement: item.question
                }))
            }))
            )
        }

        if (quizStarted) {
            fetchData()
        }
    }, [quizStarted])


    // Set the Open Trivia DB fetch request parameters on App initialization
    function setFetchParameters() {
        const { number, category, difficulty, type } = inputValues
        let baseUrl = `https://opentdb.com/api.php?amount=${number}`

        if (category != 'any') {
            baseUrl += `&category=${category}`
        }
        if (difficulty != 'any') {
            baseUrl += `&difficulty=${difficulty}`
        }
        if (type != 'any') {
            baseUrl += `&type=${type}`
        }
        return baseUrl
    }

    // Make a fetch call to Open Trivia DB categories endpoint on App initialization
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('https://opentdb.com/api_category.php')
            const data = await response.json()
            setCategories(data.trivia_categories)
        }
        fetchCategories()
    }, [])

    // Handle form event changes and set the setInputValues state
    function handleChange(event) {
        const { name, value, type } = event.target
        // Store the form input changes in state
        setInputValues(previousValues => ({
            ...previousValues,
            // If the name of the input type is "number"
            // return the value of the number, else return the value
            [name]: event.target.type === "number" ? getNumberValue(value) : value
        }))
    }

    // If the form's input type is a number, get the number
    // value and set conditions based on it's value
    function getNumberValue(value) {
        const numberValue = Number(value);
        return numberValue > 50 ? 50 : numberValue < 1 ? 1 : numberValue
    }

    function randomizedArray(array) {
        const randomizedArr = array.map(() => Math.floor(Math.random() * array.length));
        const uniqueArr = [...new Set(randomizedArr)];
        if (uniqueArr.length < array.length) return randomizedArray(array);
        return randomizedArr.map((num) => array[num]);
    }

    function toggleQuizStarted() {
        setQuizStarted(prevState => !prevState)
    }

    function selectAnswer(id, parent) {
        setQuizData(prevQuestions => prevQuestions.map(question => ({
            ...question,
            all_answers: question.all_answers.map(answer => {
                return question.question === parent ?
                    {
                        ...answer,
                        isSelected: answer.id === id ? !answer.isSelected : false
                    } :
                    answer
            })
        })))
    }

    return (
        <main className="main--app">
            {quizStarted === true ?
                <Quiz
                    quizData={quizData}
                    handleClick={toggleQuizStarted}
                    handleBtnClick={selectAnswer}
                />
                :
                <Form
                    categories={categories}
                    handleClick={toggleQuizStarted}
                    inputValues={inputValues}
                    getNumberValue={getNumberValue}
                    handleChange={handleChange}
                />
            }
            <div className="blob--top"></div>
            <div className="blob--bottom"></div>
        </main>
    )
}
