import { CSSProperties } from "react";
import { AppNotification } from "../types";

interface Props {
  notification: AppNotification;
}

const Notification = ({ notification }: Props) => {
  if (!notification) {
    return null;
  }

  const style: CSSProperties = {
    fontSize: 18,
    padding: 5,
    backgroundColor: "lightgray",
    border: "1px solid",
  };

  switch (notification.kind) {
    case "error":
      return (
        <div style={style}>
          <p style={{ color: "red" }}>{notification.message}</p>
        </div>
      );

    case "success":
      return (
        <div style={style}>
          <p style={{ color: "green" }}>{notification.message}</p>
        </div>
      );

    default:
      return null;
  }
};

export default Notification;
