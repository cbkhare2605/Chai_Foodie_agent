import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Feedback.css'

export default function Feedback() {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')

  const handleSubmit = () => {
    alert('Feedback submitted! (Demo mode)')
    navigate(-1)
  }

  return (
    <div className="feedback-page">
      <header className="header">
        <button className="menu-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="logo">Feedback</h1>
      </header>
      <main className="main">
        <textarea
          placeholder="Share your feedback..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          className="feedback-textarea"
          rows={8}
        />
        <button className="feedback-submit" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </main>
    </div>
  )
}
