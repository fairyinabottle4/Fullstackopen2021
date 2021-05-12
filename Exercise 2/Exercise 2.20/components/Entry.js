import React from 'react'
import personService from './../services/Persons'


const Entry = ({entry}) => {

  const handleDelete = () => {
    if (window.confirm(`Delete ${entry.name}?`)) {
      personService.deleteEntry(entry.id)
    }
  }
  
  return (
      <li>{entry.name} {entry.number} <button onClick={handleDelete}>delete</button></li>
    )
  }

export default Entry