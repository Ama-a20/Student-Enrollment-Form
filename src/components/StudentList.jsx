import StudentCard from './StudentCard'

const StudentList = ({ students, title = "All Students", children }) => {
  return (
    <div className="student-list">
      <h2>{title}</h2>
      
      {students.length === 0 ? (
        <div className="status-message">No students to display yet</div>
      ) : (
        <div className="students-grid">
          {students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
      
      {children}
    </div>
  )
}

export default StudentList