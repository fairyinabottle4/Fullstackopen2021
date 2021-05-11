import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    console.log("effect")
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  })

  //this one is purely for the input text box
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber] = useState('')

  const [ searchString, setSearchString] = useState('')

  const [ showAll, setShowAll] = useState(true)

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

  //when the button is pressed and the form is submitted, this function will create
  //a new entry and add it to the existing array
  const addName = (event) => {
    event.preventDefault()
    const isDuplicate = persons.find(element => element.name === newName)
    console.log(isDuplicate)
    console.log(newName)
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const phonebookEntry = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        id: persons.length + 1
      }
  
      setPersons(persons.concat(phonebookEntry))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    // console.log(event.target.value)
    setSearchString(event.target.value)
    console.log(searchString)
    setShowAll(false)
  }



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter string={searchString} func={handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm action={addName} newName={newName} newNumber={newNumber} 
      handleName={handleAddName} handleNumber={handleAddNumber} />

      <h3>Numbers</h3>
      <Numbers namesToShow={namesToShow} />
    </div>
  )
}

export default App
