import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) return null

  const severity = notification.isError ? 'error' : 'success'

  return (
    <Alert severity={severity} data-testid="notification">
      {notification.message}
    </Alert>
  )
}

export default Notification
