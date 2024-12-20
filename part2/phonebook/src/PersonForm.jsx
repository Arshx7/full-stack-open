function PersonForm({ newName, newNum, handleName, handleNum, handleSubmit }) {
  return (
    <>
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
    </>
  );
}

export default PersonForm;
