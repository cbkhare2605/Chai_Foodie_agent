#!/bin/bash
# Foodie setup: sync PWA files and optionally start local server

set -e
cd "$(dirname "$0")"

echo "→ Syncing PWA files..."
cp foodie.html pwa/public/index.html
cp config.js pwa/public/
cp foodie-api.js pwa/public/
echo "✓ Done. index.html, config.js, foodie-api.js copied to pwa/public/"

if [ "$1" = "run" ] || [ "$1" = "serve" ]; then
  echo ""
  echo "→ Starting server at http://localhost:8080"
  echo "  Press Ctrl+C to stop"
  python3 -m http.server 8080 --directory pwa/public
fi
