import { isNotNumber } from "./utils";

interface CalculateData {
  exerciseHours: Array<number>;
  targetHour: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): CalculateData => {
  const exerciseHours: Array<number> = [];
  let targetHour = 0;
  if (args.length <= 3) {
    throw new Error("Not enough arguments");
  } else {
    args.map((a, index) => {
      if (index > 1) {
        if (!isNotNumber(a)) {
          if (index === 2) targetHour = Number(a);
          else exerciseHours.push(Number(a));
        } else throw new Error("Provided values were not numbers!");
      }
    });
  }

  return {
    exerciseHours,
    targetHour,
  };
};

export const calculateExercises = (
  exerciseHours: Array<number>,
  targetHour: number
): Result => {
  let trainingDays = 0;
  let averageTime = 0;
  let rating: number;
  let ratingDescription: string;

  exerciseHours.map((e) => {
    if (e !== 0) trainingDays++;
    averageTime += e;
  });

  averageTime = averageTime / exerciseHours.length;
  const success = averageTime >= targetHour;

  if (averageTime >= targetHour) {
    rating = 3;
    ratingDescription = "excellent";
  }

  if (averageTime <= targetHour / 2) {
    rating = 1;
    ratingDescription = "too bad";
  } else {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHour,
    average: averageTime,
  };
};

try {
  const { exerciseHours, targetHour } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, targetHour));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
