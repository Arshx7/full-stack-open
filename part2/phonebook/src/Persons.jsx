function Persons({ searchedList }) {
  return (
    <>
      {searchedList.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
}

export default Persons;
