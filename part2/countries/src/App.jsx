import { useEffect, useState } from "react";
import axios from "axios";

const CountriesList = ({ list, handleShow }) => {
  if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (list.length === 1) {
    let result = list[0];

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
        <Weather country={result} />
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

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  let lat = country.capitalInfo.latlng[0];
  let lon = country.capitalInfo.latlng[1];
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric
`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);

  if (!weather) {
    return <div>Loading weather data</div>;
  }
  let temperature = weather.main.temp;
  let imageSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  let windSpeed = weather.wind.speed;
  let description = weather.weather[0].description;

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temperature} Celsius</p>
      <img src={imageSrc} alt={description} />
      <p>wind {windSpeed} m/s</p>
    </>
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
