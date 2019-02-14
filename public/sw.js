
self.addEventListener('install', function(event) {
	console.log("Loading service worker =================");

	// wait for page install before caching 	
	event.waitUntil(
		caches.open('neighborhood-map-react-cache').then(function(cache){
			return cache.addAll([
					'/',
					'/index.html',
					'/favicon.ico',
					'/manifest.json',
					'/components/Map.js',
					'/components/Sidebar.js',
					'/components/Venue.js',
					'/components/Venues.js',
					'/App.js',
					'/App.css',
					'/index.css',
					'/index.js'
				]);
		}));
});	


self.addEventListener('fetch', function(event) {
	console.log("fetching content worker =================");

	// wait for page install before caching 	
	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response) {
			    console.log("Found request " + event.request.url + " in cache");
				return response;
			}else {
				console.log("Request " + event.request.url + " not found in cache");
				return fetch(event.request).then(function(response){
					const copyResponse = response.clone();
					caches.open('neighborhood-map-react-cache').then(function(cache){
							cache.put(event.request,copyResponse);
					});
					return response;
				});
			}
		})

		);
});	 



