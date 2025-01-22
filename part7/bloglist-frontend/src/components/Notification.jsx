import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) return null

  const className = notification.isError
    ? 'notification error'
    : 'notification success'

  return (
    <div className={className} data-testid="notification">
      {notification.message}
    </div>
  )
}

export default Notification
