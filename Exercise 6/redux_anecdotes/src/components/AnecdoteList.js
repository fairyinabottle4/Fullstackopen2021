import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const Anecdote = ({props, anecdote}) => {
  const vote = (id, content) => {
    props.addVote(id)
    props.setNotification(`You voted for '${content}'`, 5)
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
    </div>
  )
}

const Anecdotes = (props) => {
  const sortedAnecdotes = props.anecdotes.sort((a,b) => b.votes - a.votes)
  return (
    <div>
      {sortedAnecdotes.map(anecdote => <Anecdote
        key={anecdote.id}
        props={props}
        anecdote={anecdote}
      />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (!state.filter) {
    return {
      anecdotes: state.anecdotes.sort((a,b) => b.votes - a.votes)
    } 
  } else {
    return {
      anecdotes: state.anecdotes.filter(person => 
        person.content.toLowerCase().includes(state.filter.toLowerCase()))
    } 
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)