import { useState } from "react";

const Statistics = (props) => {
  return (
    <>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.total}</div>
      <div>average {props.average}</div>
      <div>positive {props.positive} %</div>
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGood() {
    setGood(good + 1);
  }
  function handleNeutral() {
    setNeutral(neutral + 1);
  }
  function handleBad() {
    setBad(bad + 1);
  }
  const total = good + neutral + bad;

  const average = (good - bad) / total;

  const positive = (good / total) * 100;
  let checkStat = () => {
    if (total > 0) {
      return <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />;
    } else {
      return <div> No Feedback</div>
    }
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      {checkStat()}
    </div>
  );
};

export default App;
