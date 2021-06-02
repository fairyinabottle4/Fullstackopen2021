import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  useParams,
  Redirect
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { Link, Button, TextField } from '@material-ui/core'  
import { updateComment } from '../reducers/blogsReducer'

const BlogPage = () => {
  const [newComment, setNewComment] = useState('')
  
  const dispatch = useDispatch()
  //possible bug here, need to refesh the list of blogs
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  const handleNewComment = (event) => {
    setNewComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    const blogObject = {
      ...blog, 
      comments: blog.comments.concat(newComment)
    }
    const newBlog = await blogService.update(id, blogObject)
    dispatch(updateComment(id, newBlog))
    setNewComment('')
  }
  if (!blog) {
    return <Redirect to="/blogs" />
  }
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <Link href={blog.url}>{blog.url}</Link>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <TextField 
            label='comment' 
            value={newComment} 
            onChange={handleNewComment} 
            id='comment'>
          </TextField>
        </div>
      <Button variant='contained' size='small' color='primary' type='submit'>add comment</Button>  
      </form>
      {blog.comments.map(comment => <li>{comment}</li>)}
    </div>
  )
}


  export default BlogPage