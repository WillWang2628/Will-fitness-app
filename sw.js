const CACHE_NAME = "workout-app-v2";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./config.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Sheet CSV 跟 YouTube 一律走網路，不快取，離線時由 app.js 讀 localStorage 備援
  if (url.hostname.includes("docs.google.com") || url.hostname.includes("youtube.com")) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
