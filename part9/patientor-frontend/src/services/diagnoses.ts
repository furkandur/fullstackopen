import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const url = `${apiBaseUrl}/diagnoses`;

const getAll = async () => {
  const { data } = await axios.get<Array<Diagnosis>>(url);

  return data;
};

export default { getAll };
