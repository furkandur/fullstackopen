import { SyntheticEvent, useEffect, useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface Props {
  submit: (newDiary: NewDiaryEntry) => void;
}

const EntryForm = ({ submit }: Props) => {
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const d = new Date();
    const today = d.toJSON().slice(0, 10);
    setToday(today);
    setDate(today);
  }, []);

  const addDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    submit(newDiary);
  };

  const visibilities = Object.values(Visibility);
  const weathers = Object.values(Weather);

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={addDiaryEntry}>
        <div>
          date:
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            min={"2000-01-01"}
            max={today}
          />
        </div>
        <div>
          visibility:
          {visibilities.map((v, index) => (
            <label key={v}>
              {" "}
              {v}
              <input
                type="radio"
                name="visibility"
                id={v}
                onChange={() => setVisibility(v)}
                defaultChecked={index === 0}
              />
            </label>
          ))}
        </div>
        <div>
          weather:
          {weathers.map((w, index) => (
            <label key={w}>
              {" "}
              {w}
              <input
                type="radio"
                name="weather"
                id={w}
                onChange={() => setWeather(w)}
                defaultChecked={index === 0}
              />
            </label>
          ))}
        </div>
        <div>
          comment:
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default EntryForm;
