#!/bin/bash
# Sync foodie.html to PWA and run local server for testing

cd "$(dirname "$0")"
echo "Syncing foodie.html → pwa/public/index.html"
cp foodie.html pwa/public/index.html
echo "Starting server at http://localhost:8080"
echo "Press Ctrl+C to stop"
python3 -m http.server 8080 --directory pwa/public
