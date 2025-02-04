import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <ul>
          <li>{part.description}</li>
        </ul>
      );
    case "background":
      return (
        <ul>
          <li>{part.description}</li>
          <li>
            submit to{" "}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </li>
        </ul>
      );
    case "group":
      return (
        <ul>
          <li>project exercises: {part.groupProjectCount}</li>
        </ul>
      );
    case "special":
      return (
        <ul>
          <li>required skills: {part.requirements.join(", ")}</li>
        </ul>
      );
    default:
      assertNever(part);
  }
};

export default Part;
