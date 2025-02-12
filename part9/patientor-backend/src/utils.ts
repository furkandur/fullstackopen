import { Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";
import z, { string } from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(string()).optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareSchema,
  HealthCheckEntrySchema,
]);

export const NewEntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareSchema.omit({ id: true }),
  HealthCheckEntrySchema.omit({ id: true }),
]);

export const toNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};
