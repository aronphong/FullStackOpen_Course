import React, { useState } from "react";
import CountryWeather from "./CountryWeather";

const Country = ({ match, oneMatch, weatherData }) => {
  const [show, setShow] = useState(false);

  if (oneMatch || show) {
    return (
      <div>
        <h1>{match.name}</h1>
        <p>Capital {match.capital}</p>
        <p>Population {match.population}</p>

        <h2>Languages</h2>
        <ul>
          {match.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>

        <CountryWeather weatherData={weatherData} />

        <img src={match.flag} alt='country flag' />
      </div>
    );
  } else {
    return (
      <div>
        <p>{match.name}</p>
        <button onClick={() => setShow(!show)}>Show</button>
      </div>
    );
  }
};

export default Country;
