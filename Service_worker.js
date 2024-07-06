
const ASSETS = [
    "/index.html",
   ]
const  CACHE_NAME = "cache-vpdoc";

self.addEventListener("install", event => {
    event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        cache.addAll(ASSETS);
    })
    )
});

// Activation du service worker
self.addEventListener("activate", event => {
    console.log(`${CACHE_NAME} est prêt à gérer les requêtes !`);

    // Suppression des caches obsolètes
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => {
                        console.log(`${cacheName} a été supprimé.`);
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});



self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            var networkUpdate = fetch(event.request).then(networkResponse => {
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
                return networkResponse.clone();
            }).catch(error => {
                console.error('La récupération des données a échoué :', error);
                throw error;
            });
            return cachedResponse || networkUpdate;
        })
    );
});
