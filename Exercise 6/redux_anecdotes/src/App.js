import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdotesService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App