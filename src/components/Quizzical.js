import React from 'react'

import Question from './Question'

export default function Quizzical() {
    const [quizzState, setQuizzState] = React.useState([])
    const [chosen, setChosen] = React.useState(null)

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
    }, [])

    // TODO: need to find a way to change parent state from child component
    function setAnswer(id, answerID) {
        let newObject = quizzState[id];
        newObject.chosen = answerID
        setQuizzState(prev => [
            ...prev, 
            
        ])
    }

    function answerClicked(id, answer) {
        console.log(id, answer)
        setAnswer(id, answer)
        console.log(quizzState)
    }

    return (
        <div className="quizzical-app">
            {quizzState.map((item, index) => <Question 
                                                key={index} 
                                                question={item.question} 
                                                answers={item.answers} 
                                                answer={item.correct} 
                                                selfID={index}
                                                clickHandler={() => answerClicked(index, item.chosen)}
                                            />)}
        </div>
    )
}