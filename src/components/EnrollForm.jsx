import { useState, useRef } from 'react'
import Button from './Button'

const EnrollForm = ({ tracks, onEnroll, getGrade }) => {
  
  {/*CONTROLLED inputs - React manages state*/}
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [track, setTrack] = useState(tracks[0])
  const [score, setScore] = useState('')
  
  const [errors, setErrors] = useState({})
  
  {/* UNCONTROLLED inputs - DOM manages values via refs */}
  const emailRef = useRef(null)
  const isActiveRef = useRef(null)
  
  const scoreNumber = Number(score)
  const grade = !isNaN(scoreNumber) && score !== '' ? getGrade(scoreNumber) : '?'
  
  const previewText = `Preview: ${firstName || '?'} ${lastName || '?'} — ${track} (Score: ${score || '?'}, Grade: ${grade})`
  
  function validateForm() {
    const newErrors = {}
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required'
    if (!lastName.trim()) newErrors.lastName = 'Last name is required'
    
    const scoreNum = Number(score)
    if (!score) {
      newErrors.score = 'Score is required'
    } else if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      newErrors.score = 'Score must be between 0 and 100'
    }
    
    const email = emailRef.current?.value || ''
    if (!email.includes('@')) {
      newErrors.email = 'Email must contain @'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    
    if (!validateForm()) return
    
    {/* Read controlled values from state, read uncontrolled values from refs*/}
    const newStudent = {
      id: crypto.randomUUID(), 
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: emailRef.current.value,
      track: track,
      score: Number(score),
      isActive: isActiveRef.current.checked,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    }
    
    {/* Lift state up to parent */}
    onEnroll(newStudent)
    
    {/* Reset controlled fields */}
    setFirstName('')
    setLastName('')
    setTrack(tracks[0])
    setScore('')
    
    {/* Reset uncontrolled fields via refs */}
    if (emailRef.current) emailRef.current.value = ''
    if (isActiveRef.current) isActiveRef.current.checked = true
    
    setErrors({})
  }
  
  const hasErrors = Object.keys(errors).length > 0
  
  return (
    <div className="enroll-section">
      <h2>Enroll New Student</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">

          {/* CONTROLLED input */}
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Track</label>
            <select value={track} onChange={(e) => setTrack(e.target.value)}>
              {tracks.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Score (0-100) *</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter score"
              min="0"
              max="100"
            />
            {errors.score && <span className="error">{errors.score}</span>}
          </div>
        </div>
        
        <div className="form-row">

          {/* UNCONTROLLED input - uses ref and defaultValue */}
          <div className="form-group">
            <label>Email (uncontrolled) *</label>
            <input
              type="email"
              ref={emailRef}
              defaultValue=""
              placeholder="student@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                ref={isActiveRef}
                defaultChecked={true}
              />
              {' '}Active Student (uncontrolled)
            </label>
          </div>
        </div>
        
        <div className="preview">
          {previewText}
        </div>
        
        {hasErrors && (
          <div className="error-summary">
             Check back the form for errors before submitting.
          </div>
        )}
        
        <Button 
          title="Enroll Student" 
          onClick={handleSubmit}
          className="enroll-btn"
        />
      </form>
    </div>
  )
}

export default EnrollForm