import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>{label}</button>
    )
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr><td>{text}</td><td>{value}</td></tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    return (
        <table>
            <tbody>
                <StatisticLine text={"good"} value={good} />
                <StatisticLine text={"neutral"} value={neutral} />
                <StatisticLine text={"bad"} value={bad} />
                <StatisticLine text={"all"} value={good + bad + neutral} />
                <StatisticLine text={"average"} value={good - bad} />
                <StatisticLine text={"positive"} value={(good / (good + neutral + bad)) * 100 + "%"} />
            </tbody>
        </table>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button label={"good"} onClick={() => setGood(good + 1)} />
            <Button label={"neutral"} onClick={() => setNeutral(neutral + 1)} />
            <Button label={"bad"} onClick={() => setBad(bad + 1)} />
            <h1>statistics</h1>
            {(good === 0 && bad === 0 && neutral === 0)
                ? "No feedback given"
                : <Statistics good={good} neutral={neutral} bad={bad} />
            }
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)