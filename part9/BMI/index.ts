import express from "express";
import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

interface BMIQuery {
  height: string;
  weight: string;
}

interface BMIRes {
  height: number;
  weight: number;
  bmi: string;
}

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query as Partial<BMIQuery>;

  if (!height || !weight) {
    res.status(400).json({ error: "height and weight are required" });
  } else if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    try {
      const bmi = calculateBmi(Number(height), Number(weight));
      const resObj: BMIRes = {
        height: Number(height),
        weight: Number(weight),
        bmi,
      };
      res.send(resObj);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

interface ExercisesQuery {
  daily_exercises: Array<number>;
  target: number;
}

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesQuery;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  const exercisesNotNumber = Array.isArray(daily_exercises)
    ? daily_exercises.some((e) => isNotNumber(e))
    : true;

  if (exercisesNotNumber || isNotNumber(target)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    res.status(200).json(calculateExercises(daily_exercises, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
