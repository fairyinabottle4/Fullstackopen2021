import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
              {sortedBlogs.map(blog => 
              <TableRow key={blog.id}>
                  <Blog blog={blog} />
              </TableRow>
              
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs