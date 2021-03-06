import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from "react-select";

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthYear = ({ authors, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ changeBorn, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS} ],
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    const parsedBorn = parseInt(born)
    console.log(changeBorn({  variables: { 
      name: name.value,
      born: parsedBorn,  
    }}))
    setName('')
    setBorn('')
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={name}
            options={options}
            onChange={selected => setName(selected)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>

      </form>
    </div>
  )
}

export default SetBirthYear