import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

const Statistics = ({ header, good, neutral, bad }) => {
  const allScore = () => good + neutral + bad

  const avarageScore = () => (good - bad) / allScore()

  const positivePerc = () => good / allScore() * 100
  
  if (allScore() === 0) {
    return (
      <div>
        <Header text={header} />
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header text={header} />
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={allScore()} />
          <StatisticsLine text="average" value={avarageScore()} />
          <StatisticsLine text="positive" value={positivePerc()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (

    <div>
      <Header text='give feedback' />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics header='statistics' good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App