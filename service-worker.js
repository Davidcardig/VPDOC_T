const CACHE_NAME = 'api-cache';
// Ajoutez toutes vos URLs ici. Ceci est juste un exemple basé sur l'image que vous avez fournie.
const urlsToCache = [
    '/',
    '/index.html',
    '/node_modules/.vite/deps/chunk-OCHDJWGW.js?v=065a85e9',
    '/node_modules/.vite/deps/chunk-UXIASGQL.js?v=065a85e9',
    '/node_modules/.vite/deps/chunk-UXIASGQL.js?v=065a85e9',
    //tous ce qui est dans le dossier src
    '/src/pages/VPGO.tsx'
];

self.addEventListener('install', e => {
    console.log('installing service worker!!');
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('activating service worker');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then(response => {
                // Ce code met en cache les nouvelles requêtes récupérées dynamiquement.
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});