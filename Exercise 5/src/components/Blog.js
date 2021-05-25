import React, {useRef} from 'react'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'

const Blog = ({blog, updateBlog, deleteBlog}) => {
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
    <p className='blog-title-author'>{blog.title} {blog.author} </p>
    <Togglable buttonLabel="view" ref={blogDetailsRef}>
      <BlogDetails key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
    </Togglable>
  </div>)  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
