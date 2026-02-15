import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Signup.css'

export default function Signup() {
  const { isAuthenticated, login } = useAuth()

  const handleDemoLogin = () => {
    login({
      token: 'demo-token-' + Date.now(),
      payload: { displayName: 'Demo User', email: 'demo@foodie.app' }
    })
  }

  if (isAuthenticated) return <Navigate to="/profile" replace />

  return (
    <div className="signup-page">
      <div className="signup-header">
        <h1 className="signup-logo">Foodie</h1>
        <p className="signup-tagline">Trusted restaurant reviews from your connections</p>
      </div>

      <div className="signup-actions">
        <button className="signup-btn" onClick={handleDemoLogin}>
          Sign up / Login
        </button>
        <p className="signup-demo-note">
          Demo mode: no backend required. Click to try the app.
        </p>
      </div>
    </div>
  )
}
