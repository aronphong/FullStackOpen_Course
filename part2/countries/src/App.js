import axios from "axios";
import React, { useState, useEffect } from "react";
import CountrySearch from "./Components/CountrySearch";
import Country from "./Components/Country";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleSearchName = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm === "") {
      axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
        setData(response.data);
      });
    } else {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
        .then((response) => {
          setData(response.data);
        });
    }
  }, [searchTerm]);

  useEffect(() => {
    data &&
      data.length === 1 &&
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
        )
        .then((response) => {
          setWeatherData(response.data);
        });
    console.log(weatherData);
  }, [data]);

  return (
    <div>
      <CountrySearch
        searchName={searchTerm}
        handleSearchName={handleSearchName}
      />

      {data && data.length <= 10 ? (
        data.length === 1 ? (
          data.map((match) => (
            <Country
              key={match.alpha3code}
              match={match}
              oneMatch={true}
              weatherData={weatherData}
            />
          ))
        ) : (
          data.map((country) => {
            return <Country key={country.name} match={country} />;
          })
        )
      ) : (
        <p>Too many matches, be more specific</p>
      )}
    </div>
  );
};

export default App;
