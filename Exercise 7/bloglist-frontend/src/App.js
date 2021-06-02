import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import NewblogForm from './components/NewblogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import About from './components/About'
import Togglable from './components/Togglable'
import BlogPage from './components/BlogPage'
import UserPage from './components/User'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from "react-router-dom"
import { setCurrUser } from './reducers/currUserReducer'
import { initBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import UsersTable from './components/UsersTable'

import Container from '@material-ui/core/Container'

const App = () => {
  const user = useSelector(state => state.currUser)
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrUser(user))
      blogService.setToken(user.token)
    }
  }, [])  


  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewblogForm />

    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    dispatch(setCurrUser(null))
    return <LoginForm />
  }
  
  return (
    <Router>
      <Container>
        <div>
          {notification !== '' ? <Notification /> : null}
          {user === null ?
            <LoginForm /> :
            <div>
              <h2>blogs</h2>
              <Menu />
              <p>{user.name} logged in</p>
              <button onClick={handleLogout}>logout</button>
              <Switch>
                <Route path='/blogs/:id'>
                  <BlogPage />
                </Route>
                <Route path='/users/:id'>
                  <UserPage />
                </Route>
                <Route path='/users'>
                  <UsersTable />
                </Route>
                <Route path='/blogs'>
                  <BlogList/>
                </Route>
                <Route path='/create-new'>
                  <h2>create new</h2>
                  {blogForm()}
                </Route>
                <Route path='/about'>
                  <About />
                </Route>
                <Route path='/'>
                  <p>this is the home page. More to follow....</p>
                </Route>
              </Switch>
            </div>
          }
      </div>

      </Container>

    </Router>
  )
}

export default App
