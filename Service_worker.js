const  CACHE_NAME = "cache";

// l'intallation du service worker
self.addEventListener("install", event => {
    // Skip waiting
    self.skipWaiting();
});

// Activation du service worker
self.addEventListener("activate", event => {
    console.log(`${CACHE_NAME} now ready to handle fetches!`);

    // Suppression des caches obsolètes
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => {
                        console.log(`Deleting ${cacheName}`);
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});

// State-while-revalidate strategy
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    //Si la réponse du réseau est valide, elle est mise en cache
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(error => {
                    console.error('Fetching failed:', error);
                    throw error;
                });
                //Si la réponse du réseau n'est pas valide, on renvoie la réponse du cache
                return response || fetchPromise;
            }).catch(error => {
                console.error('Cache match failed:', error);
                throw error;
            });
        }).catch(error => {
            console.error('Cache open failed:', error);
            throw error;
        })
    );
});

