import { useEffect, useState } from "react";
import axios from "axios";

const CountriesList = ({ list, handleShow }) => {
  if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (list.length === 1) {
    let result = list[0];
    console.log(list);

    return (
      <>
        <h1>{result.name.common}</h1>
        <p>Capital{result.capital[0]}</p>
        <p>Area {result.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.keys(result.languages).map((language) => (
            <li key={language}>{result.languages[language]}</li>
          ))}
        </ul>
        <img src={result.flags.png} alt={result.flags.alt} />
      </>
    );
  }

  return (
    <div>
      {list.map((res, i) => {
        return (
          <div key={i}>
            {res.name.common}
            <button onClick={() => handleShow(res.name.common)}>show</button>
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountrie] = useState([]);

  let list =
    !value || value === ""
      ? []
      : countries.filter((countrie) =>
          countrie.name.common.toLowerCase().includes(value.toLowerCase())
        );

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountrie(response.data);
      });
  }, []);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleShow(selectedCountry) {
    setValue(selectedCountry);
  }

  return (
    <>
      <div>find Countries</div>
      <input value={value} type="text" onChange={handleChange} />

      <CountriesList list={list} handleShow={handleShow} />
    </>
  );
}

export default App;
