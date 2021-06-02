import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

  
const createData = (name, numBlogs, id) => {
  return {name, numBlogs, id}
}

const BasicTable = () => {
  const classes = useStyles();
  const userList = useSelector(state => state.users)
  const rows = userList.map(x => createData(x.name, x.blogs.length, x.id))

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Link to={`/users/${row.id}`}>
                  {row.name}
                </Link>
              </TableCell>
              <TableCell align="right">{row.numBlogs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable