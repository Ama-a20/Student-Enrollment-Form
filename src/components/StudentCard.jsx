function getGrade(score) {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

const StudentCard = ({ student }) => {
  const { firstName, lastName, email, track, score, isActive, avatar } = student
  
  const cardClassName = `student-card ${!isActive ? 'inactive' : ''}`
  
  return (
    <div className={cardClassName}>
      <div className="card-header">
        <img src={avatar} alt={`${firstName} ${lastName}`} className="avatar" />
        <div>
          <h3 className="student-name">{firstName} {lastName}</h3>
        </div>
      </div>
      
      <div className="student-info">
        <p><strong>Track:</strong> {track}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Score:</strong> {score} ( {getGrade(score)})</p>
        <p>
          <span className={`status-badge ${isActive ? 'status-active' : 'status-inactive'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default StudentCard