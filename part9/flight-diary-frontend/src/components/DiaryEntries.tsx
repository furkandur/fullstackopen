import { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  diaries: DiaryEntry[];
}

const DiaryEntries = ({ diaries }: DiaryEntriesProps) => {
  return (
    <div>
      <h2>Diary Enties</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <ul>
            <li>
              <strong>visibility: </strong>
              {d.visibility}
            </li>
            <li>
              <strong>weather: </strong>
              {d.weather}
            </li>
            <li>
              <i>{d.comment}</i>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
