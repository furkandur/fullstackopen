const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const TotalExercises = ({ parts }) => {
  const sum = parts.reduce(
    (next, part) => next + part.exercises, 0
  )

  return(<h3>total of {sum} exercises</h3>)
}

const Course = ({ course }) => {
  return(
    <div>
      <Header text={course.name} />
      {course.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />   
      )}
      <TotalExercises parts={course.parts} />
    </div>
  )
}

export default Course