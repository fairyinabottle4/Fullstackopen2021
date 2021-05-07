import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState([])

  const [index, setIndex] = useState(0)

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

  const getNextAnecdote = () => {
    setSelected(random(0,6))
    getMostVotes()
  }

  const updateVotes = () => {
    setVotes(previous => {
      const copy = [...previous]
      copy[selected] = (copy[selected] || 0) +1
      setVotes(copy)
      getMostVotes()
      return copy
    })
  }

  const getMostVotes = () => {
    const indexOfMaxValue = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    setIndex(indexOfMaxValue)
  }

  const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Anecdote = ({selected}) => (
    <p>{anecdotes[selected]}</p>
  )

  const Header = ({text}) => (
    <h1>{text}</h1>
  )

  const Votes = ({index}) => (
    <p>has {votes[index] || 0} votes</p>
  )

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote selected={selected}/>
      <Votes index={selected}/>
      <Button handleClick={updateVotes} text="vote"/>
      <Button handleClick={getNextAnecdote} text="next anecdote"/>
      <Header text="Anecdote with most votes"/>
      <Anecdote selected={index}/>
      <Votes index={index}/>
    </div>
  )
}

export default App

