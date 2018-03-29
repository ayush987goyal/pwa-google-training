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

  // TODO - 3.1: Add install and activate event listeners
  self.addEventListener('install', event => {
    console.log('Service worker installing...');

    // TODO - 3.4: Skip waiting
    self.skipWaiting();
  });

  self.addEventListener('activate', event => {
    console.log('Service worker activating...');
  });

  // TODO - 3.3: Add a comment to change the service worker
  // I'm a new service worker

  // TODO - 4: Add fetch listener
  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
  });
})();
