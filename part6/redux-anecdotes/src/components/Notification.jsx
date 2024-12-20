import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: notification.error ? 'red' : 'green'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification