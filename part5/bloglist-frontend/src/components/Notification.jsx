import { useState } from "react"

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const className = 
    notification.isError
    ? 'notification error' 
    : 'notification success'

  return (
      <div className={className}>
        {notification.message}
      </div>
  )
}

export default Notification