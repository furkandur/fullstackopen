import { z } from "zod";
import { EntrySchema, NewEntrySchema, NewPatientSchema } from "./utils";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient extends NewPatient {
  id: string;
  entries: Array<Entry>;
}

export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
