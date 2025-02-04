import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl: string = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

const create = async (newEntry: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, newEntry);
  return data;
};

export default { getAll, create };
