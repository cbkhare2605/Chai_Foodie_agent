import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import AddReview from './pages/AddReview'
import MapView from './pages/MapView'
import MyReviews from './pages/MyReviews'
import EditProfile from './pages/EditProfile'
import Feedback from './pages/Feedback'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="feed" element={<Feed />} />
                <Route path="add" element={<AddReview />} />
                <Route path="map" element={<MapView />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/my-reviews" element={<ProtectedRoute><MyReviews /></ProtectedRoute>} />
      <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
    </Routes>
  )
}
