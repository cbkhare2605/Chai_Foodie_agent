#!/bin/bash
# Start Foodie local server - run this, then open the URL shown
cd "$(dirname "$0")"
echo "Starting server..."
echo ""
echo "  Open in Safari: http://localhost:8888/test.html"
echo "  Then try:       http://localhost:8888/index.html"
echo ""
echo "Press Ctrl+C to stop"
echo ""
python3 -m http.server 8888 --directory pwa/public
