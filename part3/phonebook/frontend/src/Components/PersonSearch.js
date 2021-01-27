import React from "react";

const PersonSearch = ({ searchName, handleNameSearch }) => {
  return (
    <div>
      <p>Search for a contact</p>
      <input type='text' value={searchName} onChange={handleNameSearch} />
    </div>
  );
};

export default PersonSearch;
