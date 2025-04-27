// Service Worker for Price List Mobile PWA

const CACHE_NAME = 'price-list-cache-v1';
const RUNTIME_CACHE = 'price-list-runtime';

// Resources to pre-cache
const PRECACHE_URLS = [
  '/',
  '/app/price-list-dashboard',
  '/assets/js/price_list_dashboard.bundle.js',
  '/assets/css/price_list_dashboard.css',
  '/assets/frappe/images/frappe-favicon.svg',
  '/assets/frappe/js/lib/jquery/jquery.min.js',
  '/assets/frappe/js/frappe-web.min.js'
];

// Install event - pre-cache specified resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Pre-caching resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine if a request is for an API call
const isApiRequest = (request) => {
  const url = new URL(request.url);
  return url.pathname.includes('/api/method/price_list.api');
};

// Helper function for network-first strategy with timeout
const networkFirstWithTimeout = async (request, timeout = 3000) => {
  try {
    // Try network first with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Network timeout')), timeout);
    });
    
    const networkResponse = await Promise.race([
      fetch(request.clone()),
      timeoutPromise
    ]);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      caches.open(RUNTIME_CACHE).then(cache => {
        cache.put(request, responseToCache);
      });
      return networkResponse;
    }
    
    throw new Error('Network response not OK');
  } catch (error) {
    console.log('Serving from cache due to: ', error);
    // Fall back to cache
    const cachedResponse = await caches.match(request);
    return cachedResponse || Promise.reject('No network or cached response available');
  }
};

// Helper function for cache-first strategy
const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Cache miss - go to network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the response
      const responseToCache = networkResponse.clone();
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch (error) {
    console.error('Unable to fetch resource: ', error);
    // Could return a fallback response here if appropriate
    throw error;
  }
};

// Offline data queue for later synchronization
const offlineQueue = [];
const syncQueueKey = 'price_list_offline_queue';

// Save queue to local storage
const saveOfflineQueue = () => {
  localStorage.setItem(syncQueueKey, JSON.stringify(offlineQueue));
};

// Load queue from local storage
const loadOfflineQueue = () => {
  const queue = localStorage.getItem(syncQueueKey);
  if (queue) {
    offlineQueue.push(...JSON.parse(queue));
  }
};

// Add request to offline queue
const addToOfflineQueue = (request) => {
  request.clone().text().then(bodyText => {
    offlineQueue.push({
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body: bodyText,
      timestamp: new Date().toISOString()
    });
    saveOfflineQueue();
  });
};

// Process offline queue when online
const processOfflineQueue = async () => {
  if (!navigator.onLine || offlineQueue.length === 0) return;
  
  console.log('Processing offline queue: ', offlineQueue.length, ' items');
  
  // Process in FIFO order
  while (offlineQueue.length > 0) {
    const item = offlineQueue.shift();
    saveOfflineQueue(); // Save immediately to remove the processed item
    
    try {
      // Recreate the request
      const request = new Request(item.url, {
        method: item.method,
        headers: new Headers(item.headers),
        body: item.method !== 'GET' ? item.body : null
      });
      
      // Try to send it
      const response = await fetch(request);
      console.log('Processed offline request: ', response.ok ? 'Success' : 'Failed');
    } catch (error) {
      console.error('Failed to process offline request: ', error);
      // Add it back to the queue if it's still relevant
      if (new Date().getTime() - new Date(item.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000) {
        offlineQueue.push(item);
        saveOfflineQueue();
      }
      break; // Stop if we have network issues
    }
  }
};

// Handle fetch event
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests for API endpoints when offline - add to queue instead
  if (!navigator.onLine && isApiRequest(request) && request.method !== 'GET') {
    console.log('Queueing offline request: ', request.url);
    event.respondWith(new Response(
      JSON.stringify({ message: 'Offline - request queued for synchronization' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));
    addToOfflineQueue(request);
    return;
  }
  
  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // For API requests, use network-first approach with timeout
  if (isApiRequest(request)) {
    event.respondWith(networkFirstWithTimeout(request));
    return;
  }
  
  // For assets and other resources, use cache-first
  event.respondWith(cacheFirst(request));
});

// Handle online/offline status changes
self.addEventListener('online', () => {
  console.log('App is online - attempting to process offline queue');
  loadOfflineQueue();
  processOfflineQueue();
});

// Handle sync event for background sync API
self.addEventListener('sync', event => {
  if (event.tag === 'price-list-sync') {
    console.log('Sync event triggered');
    event.waitUntil(processOfflineQueue());
  }
});