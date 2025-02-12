import axios from "axios";
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const url = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(url);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${url}/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(url, object);

  return data;
};

const createEntry = async (id: string, object: EntryFormValues) => {
  const { data } = await axios.post<Entry>(`${url}/${id}/entries`, object);

  return data;
};

export default {
  getAll,
  getById,
  create,
  createEntry,
};
