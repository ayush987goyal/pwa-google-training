/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function() {
  'use strict';

  // TODO 2 - cache the application shell

  var filesToCache = [
    '.',
    'style/main.css',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    'images/still_life-1600_large_2x.jpg',
    'images/still_life-800_large_1x.jpg',
    'images/still_life_small.jpg',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
  ];

  var staticCacheName = 'pages-cache-v2';

  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntill(
      caches.open(staticCacheName).then(cache => {
        cache.addAll(filesToCache);
      })
    );
  });

  // TODO 3 - intercept network requests

  self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);

    event.respondWith(
      caches
        .match(event.request)
        .then(response => {
          if (response) {
            console.log('Found ', event.request.url, ' in cache');
            return response;
          }

          console.log('Network request for ', event.request.url);
          return (
            fetch(event.request)
              // TODO 4 - Add fetched files to the cache
              .then(response => {
                // TODO 5 - Respond with custom 404 page
                if (response.status === 404) {
                  return caches.match('pages/404.html');
                }

                return caches.open(staticCacheName).then(cache => {
                  if (event.request.url.indexOf('test') < 0) {
                    cache.put(event.request.url, response.clone());
                  }
                  return response;
                });
              })
          );
        })
        .catch(error => {
          // TODO 6 - Respond with custom offline page
          return caches.match('pages/offline.html');
        })
    );
  });

  // TODO 7 - delete unused caches

  self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    var cacheWhiteList = [staticCacheName];

    event.waitUntill(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
})();
