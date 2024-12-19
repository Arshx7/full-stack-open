import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");

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

    const personExist = persons.some(
      (person) => person.name === newPerson.name
    );

    if (personExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
    }

    setNewName("");
    setNewNum("");
  }

  const searchedList = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input type="text" value={search} onChange={handleSearch} />
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleName} />
          <div>
            number: <input value={newNum} onChange={handleNum} />
          </div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchedList.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
