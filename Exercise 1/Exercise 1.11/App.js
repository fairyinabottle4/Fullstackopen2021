import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Statistic = ({text, value}) => (
    // <p>{text} {value}</p>
    <><tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )

  const Header = (props) => {
    return (
      <div>
        <h1>{props.text}</h1>
      </div>
    )
  }

  const Statistics = () => {
    if (all === 0) {
      return (
      <div>
        <Header text="statistics"/>
        <p>No feedback given</p>    
      </div>)
    } else {
      return (
        <div>
          <Header text="statistics"/>
          <table>
            <tbody>
              <Statistic text="good" value={good}/>
              <Statistic text="neutral" value={neutral}/>
              <Statistic text="bad" value={bad}/>
              <Statistic text="all" value={all}/>
              <Statistic text="average" value={calcStats("average")}/>
              <Statistic text="positive" value={calcStats("positive")}/>
            </tbody>
          </table>
        </div>
      )  
    }
  }

  const calcStats = (type) => {
    if (type === "average") {
      return (good - bad) / all
    } else if (type === "positive") {
      return ((good) / all) * 100
    }
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistics/>
    </div>
  )
}

export default App
