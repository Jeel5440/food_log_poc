# FoodLog AI POC

A React + Vite prototype that demonstrates AI-powered meal logging. This README explains how to run the app locally, simulate the mobile experience, and build a Capacitor Android package when needed.

## Requirements
- Node.js 18 or newer (includes npm)
- Git (optional, but recommended)
- Chrome or Edge for mobile simulation
- (Android build only) Android Studio with SDK Platform 34+ and Java 17

## Quick Start (Professor Demo)
1. **Clone or download**
   ```powershell
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
   ```
   Or download ZIP from GitHub, unzip, then `cd` into the folder.
2. **Install dependencies**
   ```powershell
npm install
   ```
3. **Run the dev server**
   ```powershell
npm run dev
   ```
   The terminal prints a URL (e.g. `http://localhost:5173`).
4. **Open in the browser** and press `Ctrl+Shift+I`, then `Ctrl+Shift+M` to toggle Chrome/Edge Device Toolbar. Pick a phone preset (e.g. Pixel 7) to see the mobile layout.

## Production Build
```powershell
npm run build
```
Outputs to `dist/`.

## Optional: Capacitor Android APK
1. Ensure `capacitor.config.ts` contains:
   ```ts
   const config: CapacitorConfig = {
     appId: 'app.lovable.2e96e16cc5f94c3a96d2e45b6d14b764',
     appName: 'FoodLog AI',
     webDir: 'dist'
   };
   ```
2. Build web assets and sync:
   ```powershell
npm run build
npx cap add android      # first time only
npx cap sync android
   ```
3. Open in Android Studio and build an APK:
   ```powershell
npx cap open android
   ```
   Inside Android Studio: **Build > Build Bundle(s)/APK(s) > Build APK(s)**.
4. Launch on an emulator (Device Manager ▶) or share the generated APK (`android/app/build/outputs/apk/`).

## Project Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

## Tech Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui
- Capacitor (Android/iOS shells)

For issues or questions, open an issue in the repo or contact the project maintainer.
