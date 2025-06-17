    const CACHE_NAME = 'kyo-portfolio-cache-v1';
    const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/images/zoro.jpg',
    '/manifest.json',
    // ...add only assets that exist and are accessible...
    ];

    self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
        .catch(err => {
            // Handle errors during cache population
            console.error('Failed to cache', err);
        })
    );
    });

    self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(err => {
            // Optionally, return a fallback response here
            console.error('Fetch failed:', err);
            return new Response('Network error occurred', { status: 408 });
        })
    );
    });
