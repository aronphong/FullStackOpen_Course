import React from "react";

const CountrySearch = ({ searchName, handleSearchName }) => {
  return (
    <div>
      <h1>Search for a country</h1>
      <input type='text' value={searchName} onChange={handleSearchName} />
    </div>
  );
};

export default CountrySearch;
