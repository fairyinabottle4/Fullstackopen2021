import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INCREMENT':
      const id = action.data.id
      const toChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data].sort((a,b) => a.votes-b.votes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id)
    dispatch({
      type: 'INCREMENT',
      data: { id }
    })
  }
}

export const createAnecdote = (content) => {
  //if the content is blank? Maybe do something?
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    //send the data to the server first then change the state of the store
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
} 

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes  
    })
  }
}

export default reducer