function Filter({ search, handleSearch }) {
  return (
    <>
      filter shown with
      <input type="text" value={search} onChange={handleSearch} />
    </>
  );
}

export default Filter;
