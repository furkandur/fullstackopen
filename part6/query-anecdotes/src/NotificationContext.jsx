import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const sendNotification = (msg, error = false, duration = 5000) => {
    notificationDispatch({
      type: 'SET',
      payload: {
        message: msg,
        error: error
      }
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, duration)
  }

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch, sendNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  return context
}

export default NotificationContext