// Registering the service worker
// 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

//current cache 
var CACHE_NAME = 'my-site-cache-v19';

var urlsToCache = [
    '/',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/css/styles2.css',
    '/img/1.jpg',
    '/img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'https://api.tiles.mapbox.com/v4/mapbox.streets/16/19298/24639.jpg70?access_token=pk.eyJ1Ijoic2FudG9zaDExMzM1NTc3IiwiYSI6ImNqa21la3hqNTAxajIza3BwczM2aWc2MnAifQ.yJBkybHvlK2Yb9hApRUnLg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).catch(function(err){
      	console.log("err " + err);
      })
  );
});

 //For every fetch event we server from cache or from network then update cache also

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response)
				return response;
			return fetch(event.request);
		})	
	);
});



// Removing old caches

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(keys){
			return Promise.all(
				keys.filter(function(key){
					return key.startsWith('my-site-cache-') && key != CACHE_NAME;
				}).map(function(key){
					return caches.delete(key);
				})
			);			
		})
	);
});




