import { useEffect, useState } from 'react'
import { MOCK_REVIEWS, formatTimeAgo, type Review } from '../data/mock'
import './Feed.css'

function ReviewCard({ review }: { review: Review }) {
  const levelColor = review.level === 1 ? '#0079fc' : review.level === 2 ? '#ffa920' : '#e31919'
  return (
    <div className="review-card">
      <div className="review-card-header">
        <span className="review-restaurant">{review.restaurant.name.slice(0, 35)}{review.restaurant.name.length > 35 ? '...' : ''}</span>
        <span className="review-date">{formatTimeAgo(review.reviewDate)}</span>
        <span className="review-level" style={{ color: levelColor }}>📍</span>
      </div>
      <div className="review-card-body">
        <div className="review-meta">
          <span className="review-by">{review.reviewBy}</span>
          <span className="review-rating">
            {[1,2,3,4,5].map(i => i <= review.rating ? '❤️' : '🖤')}
          </span>
        </div>
        <p className="review-text">{review.reviewtext}</p>
        {review.wheelchairfriendly && (
          <span className="wheelchair-icon" title="Wheelchair friendly">♿</span>
        )}
      </div>
    </div>
  )
}

export default function Feed() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    setReviews(MOCK_REVIEWS)
  }, [])

  if (reviews.length === 0) {
    return <div className="feed-loading">Loading reviews...</div>
  }

  return (
    <div className="feed-page">
      {reviews.map(r => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  )
}
