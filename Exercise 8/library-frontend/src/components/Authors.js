import React from 'react'
import { ALL_AUTHORS } from '../queries'
import { gql, useQuery } from '@apollo/client';
import SetBirthYear from './SetBirthyear';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  //this result.loading is extremely important.
  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    {props.isLoggedIn ? <SetBirthYear authors={authors} setError={props.setError} /> : null }  
    
    </div>
  )
}

export default Authors
