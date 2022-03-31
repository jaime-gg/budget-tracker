const APP_PREFIX = 'budgetingTracker-';
const VERSION = 'v_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    '/',

    '/index.html',
    //'/manifest.json', // add this later pls
    '/js/index.js',
    //'/js/idb.js', //add this later pls
    '/css/styles.css',

    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'  
];


// INSTALL SERVICE WORKER
self.addEventListener('install', function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Installing Cache : ' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    );

    self.skipWaiting();
});

// ACTIVATE THE SERVICE WORKER | REMOVE OLD DATA FROM THE CACHE
self.addEventListener('activate', function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log('Deleting Cache : ' + keyList[i]);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
  
    self.clients.claim();
});

// INTERCEPT FETCH REQUESTS
self.addEventListener('fetch', function(evt) {
    if (evt.request.url.includes('/api/')) {
        evt.respondWith(
            caches
            .open(DATA_CACHE_NAME)
            .then(cache => {
                return fetch(evt.request)
                .then(response => {
                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }

                    return response;
                    })
                .catch(err => {
                    return cache.match(evt.request);
                });
            })
            .catch(err => console.log(err))
        );
  
        return;
    }
  
    evt.respondWith(
        fetch(evt.request).catch(function() {
            return caches.match(evt.request).then(function(response) {
                if (response) {
                    return response;
                } else if (evt.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/');
                }
            });
        })
    );
  });