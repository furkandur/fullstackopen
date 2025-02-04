export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export enum NotificationKind {
  Error = "error",
  Success = "success",
}

export interface Notification {
  message: string;
  kind: NotificationKind;
}

export type AppNotification = Notification | null;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
