import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Profile.css'

export default function EditProfile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-logo">Edit Profile</h1>
      </div>
      <form className="profile-form" onSubmit={e => e.preventDefault()}>
        <div className="form-group">
          <input type="text" placeholder="Name" defaultValue={user?.displayName} className="profile-input" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" className="profile-input" />
        </div>
        <button type="button" className="profile-save-btn" onClick={() => navigate(-1)}>
          Save
        </button>
      </form>
    </div>
  )
}
