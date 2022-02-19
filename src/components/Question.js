

export default function Question(props) {

    const parser = new DOMParser()

    let displayQuestion = parser.parseFromString(`<!doctype html><body>${props.question}`, 'text/html').body.textContent
    let displayAnswers = props.answers.map(ans => parser.parseFromString(`<!doctype html><body>${ans}`, 'text/html').body.textContent)

    return(
        <div className="question">
            <h2>{displayQuestion}</h2>
            <ul>
                {displayAnswers.map((answer, index) => <li key={index}><button onClick={props.clickHandler}>{answer}</button></li>)}
            </ul>
            <hr />
        </div>
    )
}