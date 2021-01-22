import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course: { parts } }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part name={part.name} exercises={part.exercises} key={part.name} />
        );
      })}
    </>
  );
};

const Total = ({ course: { parts } }) => {
  let count = 0;
  parts.map((part) => (count += part.exercises));
  return <p>Number of exercises {count}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
