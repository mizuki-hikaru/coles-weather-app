// public/service-worker.js

const CACHE_NAME = 'weather-app-cache-v2'; // Increment cache version if updating files
const urlsToCache = [
    '/',
    '/offline.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Install event - caching important files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Activate worker immediately after install
});

// Fetch event - serve cached assets or fall back to offline.html when offline
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        // If the request is a navigation request (page load), try network first, fallback to cache or offline page
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match('/offline.html');
            })
        );
    } else {
        // For non-navigation requests (like assets), use cache first
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

// Activate event - clear old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Become the active worker immediately
});
