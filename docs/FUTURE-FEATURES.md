# Foodie — Future Features to Implement

**Purpose:** Backlog of features to implement in future. Keep this list handy when planning releases.  
**Last updated:** 2025-02-12

---

## Favorites (with travel use case)

**Status:** Planned  
**Priority:** Medium

### Description

A **Favorites** list distinct from **Saved** — a curated set of the user's top restaurant recommendations. Favorites can span different countries and help when visiting or planning trips.

### Use case

- **Saved** = "Want to try" / "Places I've been" (broader list)
- **Favorites** = "Top picks" / "Go-to places" (smaller, curated list)
- When traveling to a country/city, user can quickly pull up "My favorites in [destination]"

### Features to implement

1. **Favorites list** — Add a "Favorites" list (like Saved). Star/heart icon on review cards to add/remove from Favorites.
2. **Favorites menu item** — "⭐ Favorites" in the menu, showing the user's favorited places.
3. **Location filter** — Filter favorites by country or city (e.g. "My favorites in Paris", "My favorites in India").
4. **Group by country** — Option to group favorites by country in the Favorites view.
5. **Map view** — Show favorites on a map, optionally filtered by region.
6. **Trip planning** — Before a trip, open "Favorites in [destination]" to plan meals.
7. **Social** — Optional: show "In X's favorites" badge on reviews when viewing a connection's favorites.

### Notes

- Favorites are location-aware (each has city/country from coordinates or address).
- Consider reverse-geocoding or storing city/country when adding to Favorites for reliable filtering.

---

## How to use this file

- **When planning work:** Review this list and move items to active development.
- **When adding ideas:** Add new sections with Description, Use case, Features to implement, and Notes.
- **When implemented:** Move the feature to `foodie-website/CHANGELOG.md` and remove or mark as done here.
