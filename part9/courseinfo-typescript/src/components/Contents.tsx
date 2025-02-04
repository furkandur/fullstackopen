interface ContentsProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Contents = (props: ContentsProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((c) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Contents;
