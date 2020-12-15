const CACHE_NAME = 'weather-v0.1';

self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        cache.addAll([
          '/weather/offline.html'
        ]).then(() => self.skipWaiting());
      })
    );
   });
   
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate'){
    e.respondWith(
      fetch(e.request.url)
      .catch( _ => {
        return caches.match('offline.html');
      })
    )
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});