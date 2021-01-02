import React, {useState} from 'react'

const Button = (props) => {
    const {onclick, text} = {...props};

    return (
        <>
            <button onClick={onclick}> {text} </button>
        </>
    )
}

const Statistic = (props) => {
    const {text, value} = {...props};

    return (
        <table>
            <tbody>
            <tr>
                <td style={{width: '50px'}}>{text}</td>
                <td>{value}</td>
            </tr>
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const increaseGood = () => {
        setGood(good + 1);
    }

    const increaseNeutral = () => {
        setNeutral(neutral + 1);
    }

    const increaseBad = () => {
        setBad(bad + 1);
    }

    return (
        <>
            <div>
                <h1>give feedback</h1>
            </div>
            <div>
                <Button onclick={increaseGood} text={'good'}/>
                <Button onclick={increaseNeutral} text={'neutral'}/>
                <Button onclick={increaseBad} text={'bad'}/>
            </div>
            <div>
                <h1>statistics</h1>
            </div>
            {bad === 0 && good === 0 && neutral === 0
                ? <div>No feedback given</div>
                : <>
                    <Statistic text={'good'} value={good}/>
                    <Statistic text={'neutral'} value={neutral}/>
                    <Statistic text={'bad'} value={bad}/>
                    <Statistic text={'all'} value={good + neutral + bad}/>
                    <Statistic text={'average'} value={(good - bad) / (good + neutral + bad)}/>
                    <Statistic text={'positive'} value={good * 100 / (good + neutral + bad)}/>
                </>}
        </>
    )
}
export default App;
