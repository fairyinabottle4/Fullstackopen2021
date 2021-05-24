import React from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({blog, updateBlog, deleteBlog}) => {


    const handleLike = () => {
        const updatedBlog = {...blog, likes: blog.likes + 1}
        updateBlog(blog.id, updatedBlog)
    }

    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            deleteBlog(blog.id)
        }
    }
    
    return (
        <div>
            <p>{blog.url}</p>
            <p>
                {blog.likes}
                <button onClick={handleLike}>like</button>
            </p>
            <p>{blog.user.name}</p>
            <button onClick={handleDelete}>remove</button>
        </div>
    )
}

BlogDetails.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default BlogDetails