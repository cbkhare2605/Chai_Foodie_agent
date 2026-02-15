export interface Review {
  id: string
  reviewBy: string
  reviewtext: string
  rating: number
  level: 1 | 2 | 3
  reviewDate: number
  restaurant: { name: string }
  wheelchairfriendly?: boolean
}

export interface Restaurant {
  restaurantID: string
  restaurantName: string
  latitude: number
  longitude: number
  reviews: { level: number }[]
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    reviewBy: 'Sarah M.',
    reviewtext: 'Amazing biryani! The Hyderabad-style chicken biryani is authentic and perfectly spiced. A must-try.',
    rating: 5,
    level: 1,
    reviewDate: Date.now() - 3600000,
    restaurant: { name: 'Paradise Biryani' }
  },
  {
    id: '2',
    reviewBy: 'Raj K.',
    reviewtext: 'Best filter coffee in town. Cozy atmosphere, great for meetings.',
    rating: 4,
    level: 2,
    reviewDate: Date.now() - 86400000 * 2,
    restaurant: { name: 'Indian Coffee House' }
  },
  {
    id: '3',
    reviewBy: 'Priya S.',
    reviewtext: 'Loved the dosas! Crispy and fresh. Service could be a bit faster during peak hours.',
    rating: 4,
    level: 1,
    reviewDate: Date.now() - 86400000 * 5,
    restaurant: { name: 'Saravana Bhavan' },
    wheelchairfriendly: true
  }
]

export const MOCK_MAP_RESTAURANTS: Restaurant[] = [
  { restaurantID: 'r1', restaurantName: 'Paradise Biryani', latitude: 18.52, longitude: 73.85, reviews: [{ level: 1 }] },
  { restaurantID: 'r2', restaurantName: 'Indian Coffee House', latitude: 18.53, longitude: 73.84, reviews: [{ level: 2 }] },
  { restaurantID: 'r3', restaurantName: 'Saravana Bhavan', latitude: 18.51, longitude: 73.83, reviews: [{ level: 1 }] }
]

export function formatTimeAgo(ms: number): string {
  const seconds = Math.floor((Date.now() - ms) / 1000)
  const m = seconds / 60
  const h = m / 60
  const d = h / 24
  if (seconds < 45) return 'less than a minute ago'
  if (seconds < 90) return 'about a minute ago'
  if (m < 45) return `about ${Math.round(m)} minutes ago`
  if (m < 90) return 'about an hour ago'
  if (h < 24) return `about ${Math.round(h)} hours ago`
  if (h < 42) return 'a day ago'
  if (d < 30) return `${Math.round(d)} days ago`
  if (d < 45) return 'about a month ago'
  if (d < 365) return `about ${Math.round(d / 30)} months ago`
  return `about ${Math.round(d / 365)} years ago`
}
