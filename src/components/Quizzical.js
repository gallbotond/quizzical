import React from 'react'

import Question from './Question'

export default function Quizzical() {
    const [quizzState, setQuizzState] = React.useState([])
    const [newPool, setNewPool] = React.useState(0)

    async function getQuestions() {
        let response = await fetch("https://opentdb.com/api.php?amount=5")
        let data = await response.json()
        return data;
    }

    function prepareQuestions(data) {
        let objectArray = []

        data.map(item => {
            let answersArray = []
            item.incorrect_answers.map(ans => answersArray.push(ans))
            answersArray.splice(Math.floor(Math.random() * answersArray.length), 0, item.correct_answer)
            // console.log(answersArray, item.question, item.correct_answer)

            objectArray.push({
                answers: answersArray,
                question: item.question,
                correct: item.correct_answer,
                chosen: null
            })
        })

        return objectArray
    }

    React.useEffect(() => {
        getQuestions().then(data => setQuizzState(prepareQuestions(data.results)))
        console.log(quizzState)
    }, [newPool])

    // TODO: need to find a way to change parent state from child component
    function handleAnswer(id, answerID) {
        let obj = quizzState[1]
        obj.chosen = answerID
        let before = quizzState.slice(0, id)
        let after = quizzState.slice(id + 1, quizzState.length)
        console.log(id, answerID, before, obj, after, quizzState)
        setQuizzState([...before, obj, ...after])
    }

    return (
        <>
            <div className="quizzical-app">
                {quizzState.map((item, index) => <Question 
                                                    key={index} 
                                                    question={item.question} 
                                                    answers={item.answers} 
                                                    answer={item.correct} 
                                                    selfID={index}
                                                    clickHandler={() => handleAnswer(index, item.chosen)}
                                                />)}
            </div>
            <button onClick={() => setNewPool(prev => prev + 1)}>New pool</button>
        </>
    )
}