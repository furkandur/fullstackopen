const Notification = ({ notifMsg }) => {
    if (notifMsg.message === null) {
      return null
    }
  
    if (notifMsg.isError) return <div className="error">{notifMsg.message}</div>
    return <div className="success">{notifMsg.message}</div>
  }

  export default Notification