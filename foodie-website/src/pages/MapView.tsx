import { useEffect, useState } from 'react'
import { MOCK_MAP_RESTAURANTS } from '../data/mock'
import './MapView.css'

export default function MapView() {
  const [restaurants] = useState(MOCK_MAP_RESTAURANTS)
  const [filter, setFilter] = useState<'all' | '1' | '2'>('all')
  const [total, setTotal] = useState(0)
  const [lvl1, setLvl1] = useState(0)
  const [lvl2, setLvl2] = useState(0)

  useEffect(() => {
    let t = 0, l1 = 0, l2 = 0
    restaurants.forEach(r => {
      r.reviews.forEach(rev => {
        t++
        if (rev.level === 1) l1++
        else if (rev.level === 2) l2++
      })
    })
    setTotal(t)
    setLvl1(l1)
    setLvl2(l2)
  }, [restaurants])

  return (
    <div className="map-view-page">
      <div className="map-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <span>📍 Total Reviews</span>
          <span>{total}</span>
        </button>
        <button
          className={`filter-btn blue ${filter === '1' ? 'active' : ''}`}
          onClick={() => setFilter('1')}
        >
          <span>📍 First Level</span>
          <span>{lvl1}</span>
        </button>
        <button
          className={`filter-btn orange ${filter === '2' ? 'active' : ''}`}
          onClick={() => setFilter('2')}
        >
          <span>📍 Second Level</span>
          <span>{lvl2}</span>
        </button>
      </div>

      <div className="map-placeholder">
        <p>Map view (demo mode)</p>
        <p className="map-placeholder-hint">
          {restaurants.length} restaurants loaded. In production, this would show Google Maps with markers.
        </p>
        <div className="map-list">
          {restaurants.map(r => (
            <div key={r.restaurantID} className="map-list-item">
              <strong>{r.restaurantName}</strong>
              <span>{r.latitude}, {r.longitude}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
