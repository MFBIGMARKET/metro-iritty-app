const CACHE_NAME = 'metro-pwa-v2';

self.addEventListener('install', event => {
    // Forces the service worker to activate immediately
    self.skipWaiting(); 
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // Satisfies the PWA requirement by having a fetch handler
    // Network-first strategy (always gets fresh data from GitHub)
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});