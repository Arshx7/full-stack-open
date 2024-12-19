const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises;
  }
  return <h3>Number of exercises {sum}</h3>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const partsList = parts.map((part) => {
    console.log(part);
    return <Part part={part} key={part.id} />;
  });
  return <>{partsList}</>;
};
const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};
const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
