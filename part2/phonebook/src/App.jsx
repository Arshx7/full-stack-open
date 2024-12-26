import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
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
    console.log(persons);
    const newPerson = {
      name: newName,
      number: newNum,
    };

    const personExist = persons.some(
      (person) => person.name === newPerson.name
    );

    if (personExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    axios.post(`http://localhost:3001/persons`, newPerson).then((response) => {
      console.log(response);
    });

    setNewName("");
    setNewNum("");
  }

  const searchedList = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

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
      <Persons searchedList={searchedList} />
    </div>
  );
};

export default App;
