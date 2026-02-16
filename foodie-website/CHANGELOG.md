# Foodie App — Changelog

**Purpose:** Version control and release history for the Foodie PWA.  
**Last updated:** 2025-02-12

---

## [Unreleased]

- (none)

---

## [v4.1] — 2025-02-12 (QA pass)

### Fixed

- **XSS:** User content in title attributes (display names, likedBy, alsoBy, cuisines) now escaped with escapeHtml.
- **Null-safety:** Guards for state.user in toggleLike, addComment, sendConnectionRequest, accept/ignore/cancelConnectionRequest, removeConnection, addReview to prevent crashes when session expires.

---

## [v4] — 2025-02-12

### Added

- **Cancel pending connection requests** — Users can cancel connection requests they sent from Network → Pending (sent). Migration 010 adds RLS policy for sender to update.
- **Cache invalidation** — Query params (`?v=4`) on scripts and service worker; cache name `foodie-v4` to force users to load latest code.

### Changed

- **Network** — Removed "Refresh & show debug" button from Groups page. `groupsDebug` removed from API and state.
- **SYNC-AND-PUSH.md** — Added cache invalidation instructions.

### Fixed

- Groups visibility and RLS (migrations 002–009).
- Pull-to-refresh on all tabs.
- Search input in Network tab (cache-related).

---

## [v3] — Earlier 2025-02

### Added

- **Groups** — Create, add members, group feed, remove, leave, delete.
- **People search** — LinkedIn-style search in Network tab.
- **Invite flow** — Reorganized: Invite via link vs Connect with someone on Foodie.
- **Pull-to-refresh** — On Feed, Add, Network, Groups, Map.

### Changed

- Network tab reorganized.

---

## [v2] — 2025-02-14

### Added

- PWA setup (icons, manifest, service worker).
- Supabase backend (Auth, reviews, comments, connections, saved, groups).
- Deployment config (Vercel, Netlify).

---

## [v1] — 2025-02-12

### Added

- Initial demo: Feed, Add, Network, Map.
- Yelp-differentiating features: mutual connections, verified visit, would go again, private notes, trust score, group lists, restaurant alerts.
- localStorage-only mode (no backend).

---

*Format: [Keep a Changelog](https://keepachangelog.com/). Add entries under Added, Changed, Fixed, Removed.*
