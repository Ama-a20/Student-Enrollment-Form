function Header({ title, studentCount, averageScore }) {
  const formattedAverage = averageScore.toFixed(1)
  
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="stats">
        {studentCount} Student{studentCount !== 1 ? 's' : ''} Enrolled | 
        Class Average: {formattedAverage}%
      </div>
    </header>
  )
}

export default Header