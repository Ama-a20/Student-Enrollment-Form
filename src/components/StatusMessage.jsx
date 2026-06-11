const StatusMessage = ({ type, errorMsg = "" }) => {
  const messages = {
    loading: {
      icon: "...",
      text: "Student roster loading...",
      className: "status-loading"
    },
    error: {
      icon: "❗",
      text: errorMsg || "Failed to load students. Using seed data instead.",
      className: "status-error"
    }
  }
  
  const current = messages[type] || messages.error
  
  return (
    <div className={`status-message ${current.className}`}>
      {current.icon} {current.text}
    </div>
  )
}

export default StatusMessage