import Contents from "./components/Contents";
import Header from "./components/Header";
import Total from "./components/Total";

interface CourseParts {
  name: string;
  exerciseCount: number;
}

const App = () => {
  const courseName: string = "Half Stack application development";
  const courseParts: CourseParts[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises: number = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Contents courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
