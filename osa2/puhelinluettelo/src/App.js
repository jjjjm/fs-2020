import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  return (
    <div style={notificationStyle}>{message}</div>
  )
}

const Error = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  return (
    <div style={errorStyle}>{message}</div>
  )
}

const Person = ({ person, deleteFunction }) => {
  return (
    <div>{person.name} {person.number} <button onClick={() => deleteFunction(person)}> delete </button></div>
  )
}

const Input = ({ label, searchValue, onChangeFunction }) => {
  return (
    <div>
      {label} <input value={searchValue} onChange={(event) => onChangeFunction(event.target.value)} />
    </div>
  )
}

const NewPersonForm = ({ newPersonHandler, name, number, newNameFunction, newNumberFunction }) => {
  return (
    <div>
      <form onSubmit={(event) => newPersonHandler(event)}>
        <Input label={'name: '} searchValue={name} onChangeFunction={newNameFunction} />
        <Input label={'number: '} searchValue={number} onChangeFunction={newNumberFunction} />
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Persons = ({ persons, deleteFunction }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} deleteFunction={deleteFunction} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const duplicate = persons.find(person => person.name === newPerson.name)
    if (!duplicate) {
      personService
        .post(newPerson)
        .then(response => setPersons(persons.concat(response.data)))
        .then(response => {
          addNotification(<Notification message={`${newName} added`} />)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => addNotification(<Error message={error.response.data.error} />))
    } else if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
      personService
        .update(duplicate.id, { ...duplicate, number: newNumber })
        .then(response =>
          setPersons(persons.map(person => person.id !== duplicate.id ? person : response.data)))
        .then(response => addNotification(<Notification message={`Information for ${newName} updated`} />))
        .catch(response => addNotification(<Error message={`${newName} already deleted`} />))
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => setPersons(persons.filter(curr => curr.id !== person.id)))
        .then(response => addNotification(<Notification message={`${person.name} removed`} />))
        .catch(error => {
          addNotification(<Error message={`Information for ${person.name} has already been deleted from the server`} />)
          console.log(error)
        })
    }
  }

  const addNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {notification}
      <Input label={'search: '} searchValue={searchTerm} onChangeFunction={setSearchTerm} />
      <h2>Add new</h2>
      <NewPersonForm
        name={newName}
        number={newNumber}
        newNameFunction={setNewName}
        newNumberFunction={setNewNumber}
        newPersonHandler={addPerson} />
      <h2>Numbers</h2>
      {searchTerm.length === 0
        ? <Persons persons={persons} deleteFunction={deletePerson} />
        : <Persons persons={persons.filter(person => person.name.toUpperCase().includes(searchTerm.toUpperCase()))} deleteFunction={deletePerson} />
      }
    </div>
  )

}

export default App