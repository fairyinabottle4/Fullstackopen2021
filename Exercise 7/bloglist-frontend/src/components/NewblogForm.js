import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { createBlog } from '../reducers/blogsReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { Button, TextField } from '@material-ui/core'

const NewBlogForm = () => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      comments: []
    }
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
    dispatch(initializeUsers())
    dispatch(setNotification(`A new blog ${newBlogTitle} by ${newBlogAuthor}`))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
  <form onSubmit={addBlog} id="create">
    <div>
      <TextField     
        label='title' 
        value={newBlogTitle}
        onChange={handleTitleChange}
        id="Title">
      </TextField>
      <br/>
      <TextField         
        label='author'
        value={newBlogAuthor}
        onChange={handleAuthorChange}
        id="Author">
      </TextField>
      <br/>
      <TextField
        label='Url'
        value={newBlogUrl}
        onChange={handleUrlChange}
        id="Url">
      </TextField>
    </div>
    <Button variant='contained' color='primary' type="submit">create</Button>
  </form>  
)}

export default NewBlogForm
