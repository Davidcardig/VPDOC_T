const  CACHE_NAME = "cache-vpdoc";

// Installation du service worker
self.addEventListener("install", event => {
    // Activer immédiatement le nouveau service worker
    self.skipWaiting();
});

// Activation du service worker
self.addEventListener("activate", event => {
    console.log(`${CACHE_NAME} est prêt à gérer les requêtes !`);

    // Suppression des caches obsolètes pour éviter de saturer l'espace de stockage
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


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Serve from cache first
            const fetchPromise = fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    // Update the cache with a clone of the network response
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            }).catch(error => {
                console.error('Fetch failed:', error);
                throw error;
            });

            // Retourne la réponse du cache si elle existe, sinon la réponse du réseau
            return response || fetchPromise;
        }).catch(error => {
            console.error('Cache match failed:', error);
            throw error;
        })
    );
});

