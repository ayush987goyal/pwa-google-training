self.addEventListener('install', event => {
  event.waitUntill(
    caches.open('static-cahche-v1').then(cache => {
      return cache.addAll([
        '.',
        'index.html',
        'css/main.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        'images/still_life-1600_large_2x.jpg',
        'images/still_life-800_large_1x.jpg',
        'images/still_life_medium.jpg',
        'images/still_life_small.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request);
    })
  );
});
