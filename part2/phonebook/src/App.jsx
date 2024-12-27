import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personServices from "./services/persons";
import Notification from "./Notification";
import "./App.css";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ text: null, type: null });

  useEffect(() => {
    personServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  function handleName(event) {
    setNewName(event.target.value);
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleNum(event) {
    setNewNum(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNum,
    };

    const personExist = persons.find(
      (person) => person.name === newPerson.name
    );

    if (personExist) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one `
      );

      if (confirmUpdate) {
        const updatedPerson = { ...personExist, number: newNum };
        personServices
          .update(personExist.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) => {
                return person.id !== personExist.id ? person : response;
              })
            );
            setMessage({
              text: `Added ${newName}`,
              type: "success",
            });

            setNewName("");
            setNewNum("");
          })
          .catch(() => {
            setMessage({
              text: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
          });
      }
    } else {
      personServices.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setMessage({
          text: `Added ${newName}`,
          type: "succes",
        });
        setNewName("");
        setNewNum("");
      });
    }
    setTimeout(() => {
      setMessage({ text: null, type: null });
    }, 4000);
  }

  const searchedList = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      personServices.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNum={newNum}
        handleName={handleName}
        handleNum={handleNum}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons searchedList={searchedList} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
