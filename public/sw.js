var CACHE_NAME = 'suw-logs-ui-v1.0.4';
var urlsToPrefetch = [
  '/',
  '/favicon.png',
  '/build/bundle.css',
  '/build/bundle.js',
  'https://unpkg.com/bulma@0.9.0/css/bulma.min.css',
  'https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
           return new Request(urlToPrefetch, { mode: 'no-cors' });
        })).then(function() {
          console.log('All resources have been fetched and cached.');
        });
      })
  );
});

self.addEventListener('activate', function(event) {
  var version = 'v1.0.4';
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'cachestore')
            .filter(c => c[1] !== version)
            .map(c => caches.delete(c.join('-')))
        )
      )
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});