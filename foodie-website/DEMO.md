# Foodie Demo – PWA for iPhone & Android

Foodie is a **Progressive Web App (PWA)**. When you add it to your home screen, it runs full-screen like a native app, with its own icon and splash screen.

**PWA features:**
- Add to Home Screen (iOS & Android)
- Full-screen standalone mode
- App icon (192×192, 512×512)
- Offline fallback (caches core files)
- Works over HTTPS or localhost

**Share with anyone:** Deploy to get a public URL → see [DEPLOY.md](DEPLOY.md).

---

## Quick start (local)

1. **Serve the app** (required for PWA, maps, and photos):
   ```bash
   cd foodie-website
   python -m http.server 8080
   ```
2. Open **http://localhost:8080/foodie.html** in Safari (or any browser).

---

## iPhone (12 and later)

### Option A: Add to Home Screen (PWA)

1. On your Mac, find your IP: **System Settings** → **Network** → **Wi-Fi** → **Details** (or run `ipconfig getifaddr en0` in Terminal).
2. Start the server: `cd foodie-website && python -m http.server 8080`
3. On your iPhone (same Wi‑Fi), open **Safari** and go to `http://YOUR-ACTUAL-IP:8080/foodie.html` — replace YOUR-ACTUAL-IP with the IP from step 1 (e.g. `http://192.168.1.5:8080/foodie.html`).
4. Tap the **Share** button (square with arrow).
5. Tap **Add to Home Screen**.
6. Name it "Foodie" and tap **Add**.

The app will open full-screen like a native app.

### Option B: Share the demo

- Share the URL with others so they can open it in Safari and add it to their Home Screen.
- **Same Mac:** `http://localhost:8080/foodie.html` | **iPhone:** `http://YOUR-MAC-IP:8080/foodie.html` (get IP from System Settings → Network).

### Option C: iOS Simulator (Xcode)

1. Install **Xcode** from the App Store.
2. Open Xcode → **Window** → **Devices and Simulators**.
3. Create an iPhone 12+ simulator.
4. In the simulator, open **Safari** and go to your Foodie URL.
5. Use **Add to Home Screen** as above.

---

## Android

### Option A: Add to Home Screen (PWA)

1. Open **Chrome** on your Android device.
2. Go to your Foodie URL.
3. Tap the **menu** (⋮) → **Add to Home screen** or **Install app**.
4. Confirm.

The app will run like a native app.

### Option B: Share the demo

- Share the URL; others can open it in Chrome and install it.

### Option C: Android Emulator

1. Install **Android Studio**.
2. Create an Android Virtual Device (e.g. Pixel 5, API 33+).
3. Start the emulator.
4. Open Chrome and go to your Foodie URL.
5. Install the app from the browser.

---

## Simulate on desktop (Safari)

1. Enable the Develop menu: **Safari** → **Settings** → **Advanced** → check **Show features for web developers**.
2. Open your Foodie URL in Safari (e.g. `http://localhost:8080/foodie.html`).
3. **Develop** → **Enter Responsive Design Mode** (or **Option+Cmd+R**).
4. Choose a device from the dropdown (e.g. **iPhone 14 Pro**, **iPhone 12**).
5. Refresh the page.

---

## Requirements for native-style demos

| Platform | Requirement |
|----------|-------------|
| **iPhone** | Safari, iOS 12+ |
| **Android** | Chrome, Android 5+ |
| **PWA install** | Served over **HTTPS** or **localhost** |

---

## Turning this into native apps

To build real App Store / Play Store apps:

1. **Capacitor** (recommended): Wrap the web app in a native shell.
   ```bash
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
   npx cap init
   npx cap add ios
   npx cap add android
   npx cap sync
   npx cap open ios   # or android
   ```

2. **Cordova**: Similar approach, older ecosystem.

3. **PWA only**: Use “Add to Home Screen” on both platforms; no store submission, but works as a demo.

---

## Troubleshooting

- **"This website could not be opened"** or **YOUR-COMPUTER-IP doesn't work**: That's a placeholder. Use `http://localhost:8080/foodie.html` when testing on the same Mac. For iPhone, replace it with your Mac's real IP (run `ipconfig getifaddr en0` in Terminal, or find it in System Settings → Network).
- **Maps not loading**: Ensure the app is served over HTTP/HTTPS (not `file://`).
- **Photos not showing**: Put images in the `photos/` folder and name them `photo1.jpg`, `photo2.jpg`, etc.
- **Service worker / offline**: Requires HTTPS or `localhost`.
