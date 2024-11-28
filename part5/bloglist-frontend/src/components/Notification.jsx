import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const className =
    notification.isError
      ? 'notification error'
      : 'notification success'

  return (
    <div className={className} data-testid='notification'>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification