import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ feedback }) => {
  const totalFeedback = Object.values(feedback).reduce((acc, val) => acc + val);
  const lengthFeedback = Object.keys(feedback).length;

  return (
    <>
      <h1>Statistics</h1>
      {totalFeedback === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{feedback.good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{feedback.neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{feedback.bad}</td>
            </tr>

            <tr>
              <td>Average</td>
              <td>{totalFeedback / lengthFeedback}</td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>{(feedback.good / totalFeedback) * 100} %</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodFeedback = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  };
  const handleNeutralFeedback = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };
  const handleBadFeedback = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='good' handleClick={handleGoodFeedback} />
      <Button text='neutral' handleClick={handleNeutralFeedback} />
      <Button text='bad' handleClick={handleBadFeedback} />

      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
