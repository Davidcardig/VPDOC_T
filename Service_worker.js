
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


// enregistre les requêtes réseau dans le cache et les renvoie toujours depuis le cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`Récupération de ${event.request.url} depuis le cache.`);
                return response;
            }

            console.log(`Récupération de ${event.request.url} depuis le réseau.`);
            return fetch(event.request);
        })
    );
});
