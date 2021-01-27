import React, { useState, useEffect } from "react";
import personService from "../Services/PersonService";
import Person from "./Person";
import PersonSearch from "./PersonSearch";
import PersonAdd from "./PersonAdd";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({});
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState({});

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value });
  };

  const handleNumberChange = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value });
  };

  const handleNameSearch = (event) => {
    setSearchName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    persons.map((person) => {
      if (person.name === newPerson.name) {
        if (person.number !== newPerson.number) {
          return personService
            .updatePerson(person.id, newPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) => {
                  return person.id !== returnedPerson.id
                    ? person
                    : returnedPerson;
                })
              );
            });
        }
        return alert(`${newPerson.name} is already in the phonebook`);
      }
    });

    persons.filter((person) => person.name === newPerson.name).length <= 0 &&
      personService.createPerson(newPerson).then((returnedPerson) => {
        setMessage({
          text: `${returnedPerson.name} added`,
          messageType: "success",
        });
        setNewPerson({ name: "", number: 0 });
        return setPersons(persons.concat(returnedPerson));
      });
  };

  const deletePersonHandler = (id) => {
    const newPersons = persons.filter((person) => person.id !== id);
    personService
      .deletePerson(id)
      .then(() => setPersons(newPersons))
      .catch((error) => {
        setMessage({
          text: `Contact was already removed from server`,
          messageType: "error",
        });
      });
  };

  const personsToShow =
    searchName === ""
      ? persons
      : persons.filter((person) => {
          return (
            person.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1
          );
        });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} messageType={message.messageType} />
      <PersonSearch
        searchName={searchName}
        handleNameSearch={handleNameSearch}
      />
      <PersonAdd
        addPerson={addPerson}
        newPerson={newPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => {
          return (
            <Person
              className='person'
              key={person.name}
              person={person}
              deletePersonHandler={deletePersonHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
