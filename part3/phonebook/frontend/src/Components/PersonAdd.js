import React from "react";

const PersonAdd = ({
  addPerson,
  newPerson,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            value={newPerson.name}
            onChange={handleNameChange}
            type='text'
          />
        </div>
        <div>
          Number:{" "}
          <input
            value={newPerson.number}
            onChange={handleNumberChange}
            type='number'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonAdd;
