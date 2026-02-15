# Foodie: Deployment Safety Checklist

**Purpose:** Ensure the app is safe to deploy and cannot be misused for malicious purposes.

---

## Intended Use

- Restaurant reviews from trusted network (1st/2nd level connections)
- Map view of reviewed restaurants
- Photos on reviews (food/restaurant related)
- Profile, connections, saved lists

---

## Security Measures Implemented

### 1. XSS (Cross-Site Scripting) ✓

- **escapeHtml()** applied to all user-controlled output:
  - Review text, restaurant name, author name
  - Comments, notifications
  - Network names, search results
  - Map popups
- Prevents script injection via malicious content

### 2. Photo Security ✓

- **Type validation:** JPEG, PNG, GIF, WebP only; SVG rejected
- **URL validation:** `isSafePhotoUrl()` – only `data:image/*` or static `photos/*`
- **Canvas re-render:** Strips EXIF, metadata, embedded scripts
- **Content moderation:** NSFW.js blocks vulgar/inappropriate images

### 3. Input Limits ✓

| Field | Max length |
|-------|------------|
| Review text | 2,000 chars |
| Display name | 50 chars |
| Restaurant name | 100 chars |
| Comment | 500 chars |
| Bio | 500 chars |

### 4. Security Headers ✓ (vercel.json)

- **X-Content-Type-Options: nosniff** – prevents MIME sniffing
- **X-Frame-Options: DENY** – prevents clickjacking
- **X-XSS-Protection: 1; mode=block** – legacy XSS filter
- **Referrer-Policy** – limits referrer leakage
- **Permissions-Policy** – restricts geolocation, camera to self

### 5. HTTPS ✓

- Vercel serves over HTTPS by default
- Required for PWA, geolocation, service worker

### 6. External Resources

- **CDNs used:** jsDelivr (TensorFlow, NSFW.js), unpkg (Leaflet), OpenStreetMap tiles, Nominatim
- All from trusted, widely-used sources
- No user-controlled URLs loaded as scripts or iframes

---

## Known Limitations (Demo Mode)

| Area | Status | Risk |
|------|--------|------|
| **Auth** | Demo login only | Anyone can pick any display name; impersonation on shared device |
| **Data** | localStorage | Per-browser; no server; data not shared across users |
| **Rate limiting** | None | User could spam (limited impact with local data) |
| **CSP** | Not set | Strict CSP would require refactoring inline handlers |

---

## What We Block

- Script injection (XSS) via escaped output
- Malicious image uploads (type + URL validation + canvas)
- Vulgar photos (NSFW.js)
- Oversized input (length limits)
- Clickjacking (X-Frame-Options)
- MIME sniffing attacks

---

## Pre-Deploy Checklist

Before deploying to production:

- [ ] All user content escaped (escapeHtml)
- [ ] Photo validation and moderation in place
- [ ] Input length limits enforced
- [ ] Security headers configured (vercel.json)
- [ ] HTTPS enabled
- [ ] No secrets or API keys in client code
- [ ] Third-party scripts from trusted CDNs only

---

## For Production (Backend)

When moving to real backend (see BACKEND-ROADMAP.md):

- Add real authentication (Supabase Auth)
- Add Row Level Security (RLS)
- Add server-side validation
- Add rate limiting
- Consider stricter CSP
- Add Content Moderation API (optional, for higher accuracy)

---

**Bottom line:** The app is safe for deployment as a demo. User content is sanitized, photos are validated and moderated, and security headers are set. For a production app with shared data, implement the backend roadmap.
