const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => (s += p.exercises), 0);

  return <h3>Total Number of exercises {total}</h3>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((part) => <Part part={part} key={part.id} />);
};

export default Course;
