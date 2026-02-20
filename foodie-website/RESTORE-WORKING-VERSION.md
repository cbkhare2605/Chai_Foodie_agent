# Restore to a Previous Version

You can restore to the **stable baseline** (v1.0-working), **test version** (v1.1-test), or **current working** (v1.2-working).

---

## v1.2-working (Current working — recommended)

Latest stable: invite auto-connect, groups, network search, pull-to-refresh, etc.

### Restore

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
git checkout v1.2-working -- foodie-website/
cd foodie-website && ./setup.sh
```

Then push to deploy:

```bash
cd ..
git add foodie-website/
git commit -m "Restore to v1.2-working (current)"
git push
```

### What it includes

- Everything in v1.1-test, plus:
- Invite flow: auto-connect survives email confirmation (localStorage + emailRedirectTo)
- Groups, network search, pull-to-refresh
- Cancel pending connection requests
- XSS and null-safety fixes

---

## v1.0-working (Stable baseline)

Tried and tested. Use this if v1.2-working causes issues.

### Restore

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
git checkout v1.0-working -- foodie-website/
cd foodie-website && ./setup.sh
```

Then push to deploy:

```bash
cd ..
git add foodie-website/
git commit -m "Restore to v1.0-working (stable baseline)"
git push
```

### What it includes

- App fits iPhone screen (viewport, scaling, mobile layout)
- Map: 600px desktop, 420px mobile
- Add/Map tab layout consistent with Feed/Groups/Network
- No ad strip, no login flash
- Supabase-ready (add credentials to config.js)

---

## v1.1-test (Test version)

New features being tested. Restore to v1.0-working if anything breaks.

### Restore to v1.1-test

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
git checkout v1.1-test -- foodie-website/
cd foodie-website && ./setup.sh
```

### What it adds (on top of v1.0-working)

- Map: click anywhere to add review (reverse geocode)
- Map: nearby restaurants/cafes as gray dots (Overpass API)
- Profile: photo upload, change, delete (Supabase Storage)
- Map zoom fix (no more blank map)

---

## Create tag for current working (run once)

To store the current state as v1.2-working:

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
git add foodie-website/
git commit -m "Tag v1.2-working: invite auto-connect, version tracking"  # if there are uncommitted changes
git tag v1.2-working
git push origin v1.2-working
```

---

## Push tags to remote (optional)

```bash
git push origin v1.0-working
git push origin v1.1-test
git push origin v1.2-working
```
