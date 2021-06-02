import React, {useRef} from 'react'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'
import {
  TableCell,
} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"


const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetailsRef = useRef()

  return (
  <div style={blogStyle} className='blog'>
    <TableCell className='blog-title-author'>
      <Link to={`/blogs/${blog.id}`}>
      {blog.title} 
      </Link>
    </TableCell>
    <TableCell>{blog.author}</TableCell>
    <Togglable buttonLabel="view" ref={blogDetailsRef}>
      <BlogDetails key={blog.id} blog={blog} />
    </Togglable>
  </div>)  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
