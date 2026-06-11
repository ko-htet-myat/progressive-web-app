import type { VitePWAOptions } from "vite-plugin-pwa";

export const pwaConfig: Partial<VitePWAOptions> = {
  registerType: "prompt", // Safest for transactional apps (user approves reload)
  injectRegister: "auto",

  // Development Options: Emulate PWA features while writing code
  devOptions: {
    enabled: true, // Allows service worker to run during 'npm run dev'
    type: "module", // Ensures TS compatibility in development mode
    navigateFallback: "index.html",
  },

  // Workbox configuration for bulletproof offline precaching
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"], // Dynamic assets to cache
    cleanupOutdatedCaches: true, // Cleans old versions automatically
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 4000000, // Increases limit to 4MB per file
  },

  // Manifest data required for installation on OS/Devices
  manifest: {
    name: "Enterprise POS Web App",
    short_name: "POSApp",
    description: "High-reliability Point of Sale Web Application",
    theme_color: "#1e3a8a",
    background_color: "#ffffff",
    display: "standalone", // Hides browser address bar to look like a native app
    orientation: "any",
    icons: [
      {
        src: "pwa-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable", // Crucial for clean Android/iOS adaptive icons
      },
    ],
  },
};
