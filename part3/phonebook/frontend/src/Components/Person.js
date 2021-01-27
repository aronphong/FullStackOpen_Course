import React from "react";

const Person = ({ person, deletePersonHandler }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePersonHandler(person.id)}>
        Delete Contact
      </button>
    </li>
  );
};

export default Person;
