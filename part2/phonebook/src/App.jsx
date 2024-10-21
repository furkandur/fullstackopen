import axios from 'axios'
import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notifMsg, setNotifMsg] = useState({ message: null, isError: null })

  const handleNameChange = (event) => { setNewName(event.target.value) }
  
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }

  const handleFilterChange = (event) => { setFilter(event.target.value) }

  const handlePersonDelete = (id) => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteById(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          notification(`Information of ${person.name} has already been removed from server`, false)
        })
    }
  }

  const notification = (message, isError) => {
    setNotifMsg({ message: message, isError: isError })
    setTimeout(() => setNotifMsg({ message: null, isError:null }), 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const replaceNumber = (person, newNumber) => {
    const newPerson = { ...person, number: newNumber } 
    personService
      .update(person.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
        clearInputs()
      })
  } 

  const addPerson = (event) => {
    event.preventDefault()

    const matched = persons.find(person => person.name === newName)
    if (matched) {
      if (window.confirm(`${matched.name} is already added to phonebook, replace the old number with a new one?`)) {
        replaceNumber(matched, newNumber)
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          notification(`Added ${returnedPerson.name}`, false)
          clearInputs()
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notifMsg={notifMsg}/>

      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filter={filter}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  )
}

export default App