import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notifReducer from './reducers/notifReducer'
import blogsReducer from './reducers/blogsReducer'
import currUserReducer from './reducers/currUserReducer'
import userReducer from './reducers/usersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notifReducer,
  currUser: currUserReducer,
  users: userReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store