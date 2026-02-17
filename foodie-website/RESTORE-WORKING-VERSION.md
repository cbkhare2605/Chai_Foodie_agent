# Restore to Working Version (v1.0-working)

If future changes break the app, you can restore to this known-good version.

## Quick restore

```bash
cd "/Users/chaitanyakhare/Cursor projects/Chai_Foodie_agent"
git checkout v1.0-working -- foodie-website/
cd foodie-website && ./setup.sh
```

Then push to deploy:

```bash
cd ..
git add foodie-website/
git commit -m "Restore to v1.0-working"
git push
```

## What this version includes

- App fits iPhone screen (viewport, scaling, mobile layout)
- Map: 600px desktop, 420px mobile
- Add/Map tab layout consistent with Feed/Groups/Network
- No ad strip, no login flash
- Supabase-ready (add credentials to config.js)

## Push the tag to remote (optional)

To keep the restore point in your GitHub repo:

```bash
git push origin v1.0-working
```
