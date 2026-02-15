import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Profile.css'

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-logo">Foodie</h1>
        <p className="profile-subtitle">We're almost done.</p>
      </div>

      <form className="profile-form" onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <input type="text" placeholder="Name" defaultValue={user?.displayName} className="profile-input" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email (required)" className="profile-input" />
        </div>
        <div className="form-group">
          <select className="profile-input">
            <option>Select Country</option>
            <option>India</option>
            <option>United States</option>
          </select>
        </div>
        <div className="form-group">
          <input type="tel" placeholder="Phone" className="profile-input" />
        </div>
        <button type="button" className="profile-save-btn" onClick={() => navigate('/app/feed')}>
          Save Profile
        </button>
        <button type="button" className="profile-skip-btn" onClick={() => navigate('/app/feed')}>
          Skip to App
        </button>
      </form>
    </div>
  )
}
