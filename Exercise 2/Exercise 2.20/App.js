import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personService from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  })

  //this one is purely for the input text box
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber] = useState('')

  const [ searchString, setSearchString] = useState('')

  const [ showAll, setShowAll] = useState(true)

  const [ showSuccess, setShowSuccess] = useState(null)

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

  const getID = (name) => {
    const personObject =  persons.find(person => name === person.name ? person.id : "")
    return personObject.id
  }

  //when the button is pressed and the form is submitted, this function will create
  //a new entry and add it to the existing array
  const addName = (event) => {
    event.preventDefault()
    const isDuplicate = persons.find(element => element.name === newName)
    if (isDuplicate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const phonebookEntry = {
            name: newName,
            number: newNumber,
            date: new Date().toISOString(),
          }
          console.log(getID(newName))
          personService.update(getID(newName) ,phonebookEntry)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName("")
              setNewNumber("")
              setShowSuccess(`Updated ${newName}`)
              setTimeout(() => {
                setShowSuccess(null)
              }, 5000)        
            })
            .catch(error => {
              setShowSuccess(`Information of ${newName} has already been removed from the server`)
              setTimeout(() => {
                setShowSuccess(null)
              }, 5000)
            })
        }
    } else {
      const phonebookEntry = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
      }
      personService.create(phonebookEntry)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setShowSuccess(`Added ${newName}`)
          setTimeout(() => {
            setShowSuccess(null)
          }, 5000)    
        })
        .catch(error => {
          setShowSuccess(`Information of ${newName} has already been removed from the server`)
          setTimeout(() => {
            setShowSuccess(null)
          }, 5000)
        })
    }
  }

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearchString(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={showSuccess}/>

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
