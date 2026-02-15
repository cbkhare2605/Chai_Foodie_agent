# Foodie: Path to Production Demo (Real Backend + Database)

**Goal:** Get the app to a state where everything is connected—real database, real auth, shared data—so when you demo with friends, everyone sees each other's reviews. Web-only (no native iOS/Android apps).

---

## Current State

| What | How it works now |
|------|------------------|
| **Data** | localStorage (per device, per browser) |
| **Auth** | Demo login: pick a name, no password |
| **Reviews** | Stored locally; each user has their own copy |
| **Connections** | Stored locally; not shared across users |
| **Result** | Each person sees only their own data + hardcoded demo users |

---

## Target State

| What | How it will work |
|------|------------------|
| **Data** | PostgreSQL (or similar) in the cloud |
| **Auth** | Real signup/login (email or social) |
| **Reviews** | Stored in DB; everyone sees real reviews from their network |
| **Connections** | Stored in DB; real friend graph |
| **Result** | Friends sign up, connect, and see each other's real reviews |

---

## Recommended Approach: Supabase

**Why Supabase:**
- PostgreSQL + Auth + Realtime + Storage in one
- Free tier suitable for demos
- JavaScript client works in the browser (PWA)
- No backend code to deploy (serverless)
- Row-level security for privacy

**Alternatives:** Firebase, custom Node.js + PostgreSQL, PlanetScale + Auth0

---

## Implementation Phases

### Phase 1: Supabase Setup (≈30 min)

1. **Create Supabase project** at [supabase.com](https://supabase.com)
2. **Create tables** (see schema below)
3. **Enable Auth** (email + optional Google/GitHub)
4. **Configure Row Level Security (RLS)** so users only see allowed data
5. **Seed initial data** (optional: migrate DEFAULT_REVIEWS for demo users)

### Phase 2: Data Layer Abstraction (≈2–3 hours)

Replace `saveToStorage()` / `loadFromStorage()` with an API layer:

```
api.js (or inline in foodie.html)
├── api.reviews.get()      → fetch reviews from DB
├── api.reviews.add()      → insert review
├── api.reviews.update()   → update review
├── api.reviews.delete()   → delete review
├── api.connections.*      → CRUD for connections
├── api.connectionRequests.*
├── api.comments.*
├── api.saved.*
├── api.profiles.*
├── api.privateNotes.*
├── api.groupLists.*
└── api.notifications.*
```

- Keep `state` in memory for UI reactivity
- After each mutation: call API, then update `state`, then `render()`
- On load: call API to hydrate `state`, then `render()`

### Phase 3: Auth Integration (≈1–2 hours)

1. **Replace demo login** with Supabase Auth
2. **Signup flow:** email + password (or magic link)
3. **Login flow:** same
4. **Session:** Supabase returns JWT; use it for all API calls
5. **Profile:** Link `auth.users` to `profiles`; `displayName` comes from profile

### Phase 4: Visibility & Trust Logic (≈1 hour)

- **Reviews:** User sees own + 1st-level (direct connections) + 2nd-level (friends of friends)
- **Implementation:** Backend filters reviews by connection graph, or frontend fetches "all visible" via a view/RPC
- **RLS policies:** Ensure users can only read reviews from their network

### Phase 5: Realtime (Optional, ≈30 min)

- Supabase Realtime: subscribe to `reviews`, `comments`, `connection_requests`
- When a friend posts a review, it appears without refresh

### Phase 6: Photo Storage (Optional)

- Store photo URLs in Supabase Storage
- Upload on add review; store URL in `reviews.photos`

---

## Database Schema (Supabase / PostgreSQL)

```sql
-- Users (Supabase Auth handles auth.users; we extend with profiles)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null unique,
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Reviews
create table reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  restaurant text not null,
  lat float not null,
  lng float not null,
  text text not null,
  rating int not null check (rating between 1 and 5),
  cuisine text default 'Various',
  price int default 2,
  photos jsonb default '[]',
  verified_visit boolean default false,
  would_go_again boolean default true,
  created_at timestamptz default now()
);

-- Connections (bidirectional: A-B and B-A)
create table connections (
  user_a uuid references auth.users(id) on delete cascade,
  user_b uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_a, user_b),
  check (user_a < user_b)
);

-- Connection requests
create table connection_requests (
  id uuid primary key default gen_random_uuid(),
  from_user uuid not null references auth.users(id) on delete cascade,
  to_user uuid not null references auth.users(id) on delete cascade,
  status text default 'pending', -- pending, accepted, ignored
  created_at timestamptz default now(),
  unique (from_user, to_user)
);

-- Comments
create table comments (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references reviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  created_at timestamptz default now()
);

-- Likes (reviews can be liked)
create table review_likes (
  review_id uuid references reviews(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  primary key (review_id, user_id)
);

-- Saved (user saves a restaurant key)
create table saved (
  user_id uuid references auth.users(id) on delete cascade,
  saved_key text not null,  -- e.g. "lat,lng|restaurant"
  created_at timestamptz default now(),
  primary key (user_id, saved_key)
);

-- Group lists (e.g. "Date night", "Family favorites")
create table group_list_items (
  user_id uuid references auth.users(id) on delete cascade,
  list_name text not null,
  saved_key text not null,
  created_at timestamptz default now(),
  primary key (user_id, list_name, saved_key)
);

-- Private notes (user's note on their own review)
create table private_notes (
  user_id uuid references auth.users(id) on delete cascade,
  review_id uuid references reviews(id) on delete cascade,
  note text,
  primary key (user_id, review_id)
);

-- Notifications
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null,
  text text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- Indexes for common queries
create index idx_reviews_user on reviews(user_id);
create index idx_reviews_location on reviews(lat, lng);
create index idx_reviews_created on reviews(created_at desc);
create index idx_comments_review on comments(review_id);
create index idx_connection_requests_to on connection_requests(to_user, status);
```

---

## Key Code Changes (High Level)

### 1. Config

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

### 2. Auth

```javascript
// Signup
const { data, error } = await supabase.auth.signUp({ email, password });

// Login
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();
```

### 3. Replace saveToStorage

```javascript
async function saveReview(review) {
  const { data, error } = await supabase.from('reviews').upsert(review);
  if (!error) {
    state.reviews = await fetchReviews();
    render();
  }
}
```

### 4. Replace loadFromStorage

```javascript
async function loadData() {
  const user = (await supabase.auth.getUser()).data?.user;
  if (!user) return;
  state.user = await getProfile(user.id);
  state.reviews = await fetchVisibleReviews();  // filtered by network
  state.connections = await fetchConnections();
  // ... etc
  render();
}
```

---

## Effort Estimate

| Phase | Time | Notes |
|-------|------|-------|
| 1. Supabase setup | 30 min | Create project, tables, RLS |
| 2. Data layer | 2–3 hrs | Replace all localStorage with API calls |
| 3. Auth | 1–2 hrs | Signup, login, session |
| 4. Visibility | 1 hr | Network filtering, RLS |
| 5. Realtime (opt) | 30 min | Live updates |
| 6. Photos (opt) | 1 hr | Storage bucket |
| **Total** | **~6–8 hrs** | Core (phases 1–4) |

---

## Demo Flow After Implementation

1. **You** create a Supabase project, deploy the updated app to Vercel
2. **Friends** open the URL, sign up with email
3. **You** send connection requests (by display name or email)
4. **Friends** accept; you're now connected
5. **Everyone** posts reviews; they appear in each other's feeds
6. **Map, network score, etc.** all work with real shared data

---

## Next Steps

1. **Create Supabase project** and get URL + anon key
2. **Run the schema** in Supabase SQL editor
3. **Implement Phase 2** (data layer) — can be done incrementally (reviews first, then connections, etc.)
4. **Implement Phase 3** (auth)
5. **Test** with 2–3 accounts
6. **Deploy** to Vercel; share link with friends

If you want to proceed, the next concrete step is creating the Supabase project and schema, then wiring the reviews API first.
