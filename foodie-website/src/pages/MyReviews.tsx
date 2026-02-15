import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatTimeAgo, type Review } from '../data/mock'
import './Feed.css'
import './MyReviews.css'

export default function MyReviews() {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // Demo: My reviews would come from API; for now show empty
    setReviews([])
  }, [])

  return (
    <div className="my-reviews-page">
      <header className="header">
        <button className="menu-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="logo">My Reviews</h1>
      </header>
      <main className="main">
        {reviews.length === 0 ? (
          <p className="empty-state">No reviews yet. Add your first review from the Feed tab.</p>
        ) : (
          reviews.map(r => (
            <div key={r.id} className="review-card">
              <div className="review-card-header">
                <span className="review-restaurant">{r.restaurant.name}</span>
                <span className="review-date">{formatTimeAgo(r.reviewDate)}</span>
              </div>
              <div className="review-card-body">
                <div className="review-meta">
                  <span className="review-by">{r.reviewBy}</span>
                  <span className="review-rating">
                    {[1,2,3,4,5].map(i => i <= r.rating ? '❤️' : '🖤')}
                  </span>
                </div>
                <p className="review-text">{r.reviewtext}</p>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}
