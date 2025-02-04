import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Contents = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((c) => (
        <div key={c.name}>
          <h3>
            {c.name} {c.exerciseCount}
          </h3>
          <Part part={c} />
        </div>
      ))}
    </div>
  );
};

export default Contents;
