import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddReview.css'

const DEMO_PLACES = [
  { id: '1', name: 'Paradise Biryani, Pune' },
  { id: '2', name: 'Indian Coffee House, Mumbai' },
  { id: '3', name: 'Saravana Bhavan, Chennai' }
]

export default function AddReview() {
  const navigate = useNavigate()
  const [restaurantName, setRestaurantName] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [wheelchairAccess, setWheelchairAccess] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredPlaces = DEMO_PLACES.filter(p =>
    p.name.toLowerCase().includes(restaurantName.toLowerCase())
  )

  const handleSubmit = () => {
    if (!restaurantName.trim() || !review.trim()) return
    alert('Review saved! (Demo mode - no backend)')
    navigate('/app/feed')
  }

  return (
    <div className="add-review-page">
      <div className="add-review-search">
        <input
          type="text"
          placeholder="Type restaurant name to search"
          value={restaurantName}
          onChange={e => { setRestaurantName(e.target.value); setShowSuggestions(true) }}
          onFocus={() => setShowSuggestions(true)}
          className="add-review-input"
        />
        {showSuggestions && restaurantName && (
          <div className="suggestions">
            {filteredPlaces.map(p => (
              <button
                key={p.id}
                className="suggestion-item"
                onClick={() => { setRestaurantName(p.name); setShowSuggestions(false) }}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="add-review-rating">
        <span className="rating-label">Rating</span>
        <div className="rating-hearts">
          {[1,2,3,4,5].map(i => (
            <button
              key={i}
              type="button"
              className={`heart ${rating >= i ? 'active' : ''}`}
              onClick={() => setRating(i)}
            >
              ❤️
            </button>
          ))}
        </div>
      </div>

      <div className="add-review-textarea">
        <textarea
          placeholder="Review text"
          value={review}
          onChange={e => setReview(e.target.value)}
          rows={6}
        />
      </div>

      <div className="add-review-wheelchair">
        <label>
          <span>♿ Wheelchair Friendly</span>
          <input
            type="checkbox"
            checked={wheelchairAccess}
            onChange={e => setWheelchairAccess(e.target.checked)}
          />
        </label>
      </div>

      <button
        className="add-review-submit"
        onClick={handleSubmit}
        disabled={!restaurantName.trim() || !review.trim()}
      >
        Post Review
      </button>
    </div>
  )
}
