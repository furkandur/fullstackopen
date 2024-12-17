import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => notification)

  useEffect(() => {
    if (notification !== null) {
      setTimeout(() => {
        dispatch({
          type: 'notification/clearNotification'
        })
      }, 5000)
    }
  }, [notification, dispatch])

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