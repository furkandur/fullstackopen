import { useNotification} from "../NotificationContext"

const Notification = () => {
  const { notification } = useNotification()
  
  if (notification === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: notification.error ? 'red' : 'green'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
