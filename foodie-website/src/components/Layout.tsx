import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Layout.css'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const menuItems = [
    { to: '/app/feed', icon: '📋', label: 'Feed' },
    { to: '/app/add', icon: '➕', label: 'Add Review' },
    { to: '/app/map', icon: '📍', label: 'Map' }
  ]

  return (
    <div className="app-layout">
      <header className="header">
        <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
          ☰
        </button>
        <h1 className="logo">Foodie</h1>
      </header>

      {menuOpen && (
        <div className="sidebar-overlay" onClick={() => setMenuOpen(false)}>
          <aside className="sidebar" onClick={e => e.stopPropagation()}>
            <div className="sidebar-header">
              <span className="user-icon">👤</span>
              <span className="user-name">{user?.displayName || 'User'}</span>
            </div>
            <nav className="sidebar-nav">
              <button onClick={() => { navigate('/edit-profile'); setMenuOpen(false)} }>Edit Profile</button>
              <button onClick={() => { navigate('/my-reviews'); setMenuOpen(false)} }>My Reviews</button>
              <button onClick={() => { navigate('/feedback'); setMenuOpen(false)} }>Feedback</button>
              <button onClick={() => { logout(); navigate('/'); setMenuOpen(false)} }>Logout</button>
            </nav>
          </aside>
        </div>
      )}

      <main className="main">{children ?? <Outlet />}</main>

      <nav className="tabs">
        {menuItems.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
            <span className="tab-icon">{icon}</span>
            <span className="tab-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
