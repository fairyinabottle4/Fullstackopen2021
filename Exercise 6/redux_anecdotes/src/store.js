import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notifReducer,
    filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))


export default store