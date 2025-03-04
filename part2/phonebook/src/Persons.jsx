function Persons({ searchedList, handleDelete }) {
  return (
    <>
      {searchedList.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Persons;
