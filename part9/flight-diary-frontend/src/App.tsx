import { useEffect, useState } from "react";
import {
  AppNotification,
  DiaryEntry,
  NewDiaryEntry,
  NotificationKind,
} from "./types";
import diaryService from "./services/diaries";
import DiaryEntries from "./components/DiaryEntries";
import { isAxiosError } from "axios";
import Notification from "./components/Notification";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<AppNotification>(null);

  const sendNotification = (message: string, kind: NotificationKind) => {
    setNotification({ message: message, kind: kind });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    const initializeDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    initializeDiaries();
  }, []);

  const entrySubmit = async (newDiary: NewDiaryEntry) => {
    try {
      const savedDiary = await diaryService.create(newDiary);
      setDiaries(diaries.concat(savedDiary));
    } catch (error) {
      if (error) {
        if (isAxiosError(error)) {
          sendNotification(error.response?.data, NotificationKind.Error);
        } else {
          sendNotification("Something went wrong", NotificationKind.Error);
        }
      }
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      <EntryForm submit={entrySubmit} />
      <DiaryEntries diaries={diaries} />
    </div>
  );
};

export default App;
