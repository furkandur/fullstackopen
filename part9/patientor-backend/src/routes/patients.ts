import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { NewEntrySchema, NewPatientSchema } from "../utils";
import { z } from "zod";
import { Entry, NewEntry, NewPatient, Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const foundPatient = patientService.getPatientById(req.params.id);
  if (foundPatient) {
    res.send(foundPatient);
  } else res.status(404).send({ error: "patient not found" });
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error });
  }
  if (error instanceof Error) {
    res.status(404).send({ error: error.message });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const addedEntry = patientService.addEntry(req.params.id, req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
