# Foodie App — Feature Audit Checklist

**Purpose:** QA handoff for verifying all features work as intended. Use with QA / Bug Hunter agent.  
**Last updated:** 2025-02-12  
**Status:** QA pass completed 2025-02-12 (XSS and null-safety fixes applied)

---

## How to use

1. **Invoke QA agent:** *"Run a QA pass on the Foodie app using docs/FEATURE-AUDIT-CHECKLIST.md"*
2. **Or manual:** Work through each section; check off items; note bugs in PROJECT-CONTEXT or as issues.
3. **Context:** Read `docs/PROJECT-CONTEXT.md` and `foodie-website/CHANGELOG.md` first.

---

## 1. Auth & Profile

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 1.1 | Sign up | Create account with email/password; redirect to app | |
| 1.2 | Sign in | Log in; load user data from Supabase | |
| 1.3 | Sign out | Clear session; return to signup | |
| 1.4 | Edit profile | Update display name, bio, avatar; persist to Supabase | |
| 1.5 | Demo mode | When no Supabase config, use localStorage; demo signup | |

---

## 2. Feed tab

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 2.1 | Feed load | Reviews from connections (1st + 2nd degree) | |
| 2.2 | Feed search | Filter by restaurant, review text, or people | |
| 2.3 | Refresh button | Reload from server; update feed | |
| 2.4 | Pull-to-refresh | Pull down to refresh feed | |
| 2.5 | Cuisine filter | Filter by cuisine dropdown | |
| 2.6 | Price filter | Filter by price tier | |
| 2.7 | Rating filter | Filter by min rating | |
| 2.8 | Groups button | Navigate to Groups tab (when Supabase enabled) | |
| 2.9 | Review card | Show restaurant, rating, text, by, mutual connections, badges | |
| 2.10 | Like | Toggle like; update count | |
| 2.11 | Comment | Add comment; show in list | |
| 2.12 | Connect from feed | Send connection request from review/comment | |
| 2.13 | Edit review | Edit own review; save | |
| 2.14 | Delete review | Delete own review; soft delete | |
| 2.15 | List dropdown | Add to list (Date night, etc.); remove from list | |
| 2.16 | Private note | Add/edit private note on own review | |
| 2.17 | Trust score | Taste match % on reviews | |
| 2.18 | Verified / Again badges | Show when applicable | |

---

## 3. Add tab

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 3.1 | Restaurant search | Search places; select result | |
| 3.2 | Manual entry | Enter restaurant name if no result | |
| 3.3 | Rating | Set 1–5 stars | |
| 3.4 | Review text | Required; save with review | |
| 3.5 | Cuisine / price | Optional; save | |
| 3.6 | Verified visit / Would go again | Toggle; save | |
| 3.7 | Photos | Add photos; upload to storage | |
| 3.8 | Submit | Save review; appear in feed | |
| 3.9 | Pull-to-refresh | Pull down to refresh | |
| 3.10 | Fix location | Modal to correct wrong restaurant location | |

---

## 4. Network tab

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 4.1 | Invite via link | Share app link for people not on Foodie | |
| 4.2 | Connect with someone on Foodie | Search by name; send request | |
| 4.3 | People search | Type 2+ chars; debounced search; results exclude self, connections, pending | |
| 4.4 | Invitations (for me) | Accept / Ignore incoming requests | |
| 4.5 | People you might know | Friends of friends; mutual count; Connect button | |
| 4.6 | Pending (sent) | List of requests I sent; **Cancel** button | |
| 4.7 | Add from reviews | People who reviewed; Connect button | |
| 4.8 | Your connections | List; Remove button | |
| 4.9 | Pull-to-refresh | Pull down to refresh | |

---

## 5. Groups tab (Supabase only)

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 5.1 | Groups list | Show groups I created or am member of | |
| 5.2 | Refresh | Reload groups from server | |
| 5.3 | Create group | Name + add members from connections; create | |
| 5.4 | Group detail | View members; feed from members only | |
| 5.5 | Add member | Add connection to group (creator only) | |
| 5.6 | Remove member | Remove from group (creator only) | |
| 5.7 | Leave group | Leave (non-creator) | |
| 5.8 | Delete group | Creator only; delete group | |
| 5.9 | Group feed | Reviews from group members only | |
| 5.10 | Pull-to-refresh | Pull down to refresh | |

---

## 6. Map tab

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 6.1 | Map load | Show review locations; cluster/markers | |
| 6.2 | Map search | Filter by location | |
| 6.3 | Cuisine / price / rating filters | Filter markers | |
| 6.4 | Tap marker | Show restaurant info; navigate to detail | |
| 6.5 | Restaurant detail | Reviews, network score, cuisines; add review | |
| 6.6 | Pull-to-refresh | Pull down to refresh | |

---

## 7. Sidebar & menu

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 7.1 | Menu open | Hamburger opens sidebar | |
| 7.2 | My Reviews | Show only my reviews | |
| 7.3 | Saved | Saved restaurants; list filter | |
| 7.4 | Notifications | Connection requests, etc.; mark read | |
| 7.5 | Feedback | Feedback form (demo: alert) | |
| 7.6 | Logout | Sign out | |

---

## 8. PWA & deployment

| # | Feature | Expected behavior | ✓ |
|---|---------|-------------------|---|
| 8.1 | Add to Home Screen | Works on iOS and Android | |
| 8.2 | Offline | Service worker caches assets | |
| 8.3 | Cache invalidation | New version loads after deploy (v4) | |

---

## 9. Common QA patterns (Bug Hunter)

- [ ] **Input focus loss** — Typing in search/inputs; does focus persist?
- [ ] **XSS** — User-generated content escaped (escapeHtml)?
- [ ] **Null access** — Optional chaining; guards for missing state?
- [ ] **Async/replication** — Load after mutation; retry on failure?
- [ ] **Mobile** — Tap targets, scroll, keyboard?

---

## Handoff to QA agent

**Suggested prompt:**

> Run a QA pass on the Foodie app. Use `docs/FEATURE-AUDIT-CHECKLIST.md` as the feature list. Check `docs/PROJECT-CONTEXT.md` for recent work. Test on both Supabase-enabled (live) and localStorage (demo) modes if possible. Report bugs and fix straightforward issues; add PROJECT-CONTEXT entry for significant fixes.
