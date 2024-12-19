import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" , num: "9090995588" }]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("")

  function handleName(event) {
    setNewName(event.target.value);
  }

  function handleNum(event) {
    setNewNum(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newPerson = {
      name: newName,
      num: newNum
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
    setNewNum("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleName} />
          <div>number: <input value={newNum} onChange={handleNum} /></div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name} {person.num}</div>
      ))}
    </div>
  );
};

export default App;
