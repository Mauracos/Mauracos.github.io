// service-worker.js

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('your-website-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/icon.png',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
