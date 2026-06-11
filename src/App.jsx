import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ClassButton from './components/ClassButton'
import StudentList from './components/StudentList'
import StatusMessage from './components/StatusMessage'
import Button from './components/Button'
import EnrollForm from './components/EnrollForm'

const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

const SEED_STUDENTS = [
  {
    id: "seed-1",
    firstName: "Amara",
    lastName: "Johnson",
    email: "amara@kodecamp.dev",
    track: "Frontend",
    score: 92,
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "seed-2",
    firstName: "Chidi",
    lastName: "Okafor",
    email: "chidi@kodecamp.dev",
    track: "Backend",
    score: 67,
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

function getGrade(score) {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function getAverage(students) {
  if (students.length === 0) return 0
  const sum = students.reduce((total, student) => total + student.score, 0)
  return sum / students.length
}

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterTrack, setFilterTrack] = useState('All')

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('https://randomuser.me/api/?results=6&nat=us,gb')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        const apiStudents = data.results.map((user, index) => ({
          id: user.login.uuid,
          firstName: user.name.first,
          lastName: user.name.last,
          email: user.email,
          avatar: user.picture.thumbnail,
          track: TRACKS[index % TRACKS.length],
          score: Math.floor(Math.random() * 61) + 40,
          isActive: true
        }))
        
        setStudents([...SEED_STUDENTS, ...apiStudents]) 
        
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message)
        setStudents([...SEED_STUDENTS])
      } finally {
        setLoading(false)
      }
    }
    
    fetchStudents()
  }, [])

  function handleEnroll(newStudent) {
    setStudents(prevStudents => [newStudent, ...prevStudents])
  }

  function handleRefresh() {
    window.location.reload()
  }

  const filteredStudents = filterTrack === 'All' 
    ? students 
    : students.filter(student => student.track === filterTrack)

  const studentCount = filteredStudents.length
  const averageScore = getAverage(filteredStudents)

  return (
    <div className="app">
      <Header 
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={studentCount}
        averageScore={averageScore}
      />
      
      <main>
        <EnrollForm 
          tracks={TRACKS}
          onEnroll={handleEnroll}
          getGrade={getGrade}
        />
        
        {/* Filter Section - Using functional Button component */}
        <div className="filter-section">
          <h3>Filter by Track</h3>
          <div className="filter-buttons">
            <Button 
              title="All" 
              onClick={() => setFilterTrack('All')}
              className={filterTrack === 'All' ? 'filter-btn active' : 'filter-btn'}
            />
            {TRACKS.map(track => (
              <Button 
                key={track}
                title={track} 
                onClick={() => setFilterTrack(track)}
                className={filterTrack === track ? 'filter-btn active' : 'filter-btn'}
              />
            ))}
          </div>
        </div>
        
        {loading && <StatusMessage type="loading" />}
        {error && <StatusMessage type="error" errorMsg={error} />}
        
        {!loading && !error && (
          <>
            <StudentList students={filteredStudents} title="Student Roster">
              <div className="list-footer">
                End of roster — {studentCount} total students
                {filterTrack !== 'All' && ` (filtered by ${filterTrack})`}
              </div>
            </StudentList>
            
            <div className="refresh-container">
              <ClassButton 
                title="Refresh Page" 
                onClick={handleRefresh}
                className="refresh-btn"
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App