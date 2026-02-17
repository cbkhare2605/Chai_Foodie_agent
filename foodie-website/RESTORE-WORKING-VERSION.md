# Restore to a Previous Version

You can restore to either the **stable baseline** (v1.0-working) or the **test version** (v1.1-test).

---

## v1.0-working (Stable baseline)

Tried and tested. Use this if v1.1-test or later causes issues.

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

## v1.1-test (Current test version)

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

## Push tags to remote (optional)

```bash
git push origin v1.0-working
git push origin v1.1-test
```
