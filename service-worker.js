var cacheName = 'todo-list';
var appShellFiles = [
'./',
'./index.html',
'./style.css',
'./script.js'
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(appShellFiles);
		})
		);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(r) {
			return r || fetch(e.request).then(function(response) {
				return caches.open(cacheName).then(function(cache) {
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
		);
});