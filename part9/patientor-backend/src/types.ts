import { z } from "zod";
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient extends NewPatient {
  id: string;
}

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatient = Omit<Patient, "ssn">;
