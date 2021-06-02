import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { Container, Section, SectionTitle, List, ListItem } from '../globalStyles'

const UserPage = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(n => n.id === id)
  const addedBlogs = user.blogs
  if (!user) {
    return <Redirect to='/users' />
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {addedBlogs.map(blog => <p key={blog.id}>{blog.title}</p>)}
    </div>
  )
}

export default UserPage
