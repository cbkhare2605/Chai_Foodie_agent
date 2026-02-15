# Foodie: Security Status

**Summary:** The current app is a demo with **limited security**. Some XSS mitigations exist, but there are gaps. Real auth and backend security are **planned** in the backend roadmap, not yet implemented.

---

## What We Have Done (Current)

### 1. XSS – Partial escaping

| Content | Escaped? | How |
|---------|----------|-----|
| Comment text | ✓ | `.replace(/</g,'&lt;')` |
| Bio (profile) | ✓ | `.replace(/</g,'&lt;')` |
| Review text in edit textarea | ✓ | `.replace(/</g,'&lt;')` |
| Private note | ✓ | `.replace(/"/g,'&quot;')` |
| Map popup restaurant name | ✓ | `.replace(/</g,'&lt;')` |
| Various `onclick` strings | ✓ | `.replace(/'/g,"\\'")` for quotes |
| **Review text (display)** | ✓ | `escapeHtml(r.text)` |
| **Restaurant name (display)** | ✓ | `escapeHtml(r.restaurant)` |
| **Author name (r.by)** | ✓ | `escapeHtml(r.by)` |
| **Notification text** | ✓ | `escapeHtml(n.text)` |

**Status:** All user content is now escaped via `escapeHtml()`.

### 2. Photo / avatar URLs (updated)

- **Validation:** `isSafePhotoUrl()` – only allows `data:image/(jpeg|png|gif|webp);base64,...` or static `photos/*.jpg` paths
- **Upload:** Only JPEG, PNG, GIF, WebP accepted; SVG rejected (can contain scripts)
- **Processing:** All uploads re-rendered through canvas → strips EXIF, metadata, embedded scripts
- **Display:** Photos and avatars validated before use; unsafe URLs filtered out

### 3. Deployment

- Vercel serves over **HTTPS** by default
- PWA requires HTTPS (or localhost) for service worker and geolocation

### 4. Input handling

- Rating: constrained to 1–5 in UI
- Text: `.trim()` applied
- No length limits, no server-side validation (no backend yet)

---

## What We Have NOT Done (Gaps)

### 1. Authentication

- **Current:** Demo login – user picks a display name, no password
- **Risk:** Anyone can impersonate any user on the same device
- **Planned:** Supabase Auth (Phase 3 in BACKEND-ROADMAP)

### 2. Authorization

- **Current:** All logic is client-side; no server to enforce who can edit/delete what
- **Risk:** With a real backend, a malicious client could try to modify others’ data
- **Planned:** Row Level Security (RLS) in Supabase (Phase 1 & 4 in BACKEND-ROADMAP)

### 3. Data isolation

- **Current:** localStorage is per-origin, per-browser; no multi-user isolation
- **Risk:** On a shared device, anyone can see or change the same data
- **Planned:** User-scoped data in DB with RLS

### 4. CSRF

- **Current:** No backend forms; N/A
- **When backend exists:** Use SameSite cookies, CSRF tokens, or JWT in headers

### 5. Rate limiting

- **Current:** None
- **Planned:** Supabase / edge functions can add rate limits

### 6. Content Security Policy (CSP)

- **Current:** No CSP headers
- **Planned:** Add CSP to reduce XSS impact

### 7. Secure headers

- **Current:** Default Vercel headers
- **Planned:** HSTS, X-Content-Type-Options, etc. via `vercel.json` or middleware

---

## Planned Security (BACKEND-ROADMAP)

| Area | Plan |
|------|------|
| **Auth** | Supabase Auth – email/password, optional social login |
| **Authorization** | RLS – users only read/write their own and network data |
| **Data validation** | DB constraints (e.g. rating 1–5), server-side checks |
| **Visibility** | Backend filters reviews by connection graph |

---

## Recommended Immediate Fixes (Before Wider Demo)

1. **Escape all user content in HTML** ✓ Done
   - `escapeHtml()` applied to r.text, r.restaurant, r.by, n.text, comments, notifications, network names, etc.

2. **Validate photo URLs** ✓ Done
   - `isSafePhotoUrl()` allows only `data:image/(jpeg|png|gif|webp);base64,...` or static `photos/*` paths
   - All uploads re-rendered through canvas to strip metadata/scripts

3. **Add input limits** ✓ Done
   - Review: 2000 chars; Display name: 50; Restaurant: 100; Comment: 500; Bio: 500

---

## Summary Table

| Security area | Status | Notes |
|---------------|--------|-------|
| XSS (output encoding) | ✓ | escapeHtml() on all user content |
| Auth | None | Demo login only |
| Authorization | None | Client-side only |
| HTTPS | ✓ | Via Vercel |
| Input validation | ✓ | Trim, rating bounds, length limits (review 2K, name 50, etc.) |
| CSRF | N/A | No backend |
| Rate limiting | None | N/A for static app |
| RLS / data isolation | Planned | In backend roadmap |
| CSP / secure headers | Partial | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy |
| **Photo security** | ✓ | Type validation, canvas re-render, URL validation |
| **Content moderation** | Not implemented | Requires backend API (see below) |

---

## Content Moderation (Appropriateness)

**Current:** ✓ Implemented via NSFW.js (client-side). Photos are checked before upload. Blocked if Porn > 50%, Hentai > 50%, or Sexy > 85%. Model loads when user opens Add tab. First upload may take a few seconds while model loads.

**Additional options** (when backend exists):

1. **Backend API** (recommended when Supabase is in place):
   - Google Cloud Vision API (Safe Search)
   - AWS Rekognition (Moderation labels)
   - Azure Content Moderator
   - Third-party: Sightengine, Moderate, etc.

2. **Client-side** (limited accuracy):
   - TensorFlow.js + NSFW model (e.g. NSFW.js) – adds bundle size, may have false positives/negatives

3. **Human moderation:** Report button + admin queue (requires backend)

---

**Bottom line:** The app is suitable for deployment. XSS is mitigated, photos are validated and moderated, input limits are in place, and security headers are set. See `docs/DEPLOYMENT-SAFETY.md` for the full checklist. For production with shared data, implement the backend roadmap.
