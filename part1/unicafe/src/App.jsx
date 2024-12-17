import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <div>
        {text} {value}
      </div>
    </>
  );
};

const Statistics = (props) => {
  if (props.total == 0) {
    return <h3>No Feedback given</h3>;
  }

  return (
    <>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.total} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </>
  );
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleGood}>good</button>
      <button onClick={props.handleNeutral}>neutral</button>
      <button onClick={props.handleBad}>Bad</button>
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

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button
        handleGood={handleGood}
        handleBad={handleBad}
        handleNeutral={handleNeutral}
      />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
