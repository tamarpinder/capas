const CACHE_NAME = 'capas-bahamas-v1.0.0';
const STATIC_CACHE_NAME = 'capas-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'capas-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/programs',
  '/contact',
  '/how-to-apply',
  '/virtual-tour',
  '/offline',
  '/manifest.json',
  // Critical CSS and JS files will be added dynamically
];

// Assets to cache on first request
const DYNAMIC_ASSETS = [
  '/programs/',
  '/community/',
  '/news-events/',
  '/students/',
  '/api/',
];

// Assets that should always come from network (with fallbacks)
const NETWORK_FIRST_PATTERNS = [
  '/api/',
  '/search',
  '/application',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (isNetworkFirstRequest(request)) {
    event.respondWith(handleNetworkFirst(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(request)) {
    event.respondWith(handleCacheFirst(request));
  } else {
    event.respondWith(handleStaleWhileRevalidate(request));
  }
});

// Network first strategy (for API calls and dynamic content)
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('🌐 Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }
    
    // Return a basic offline response for other requests
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'This content is not available offline' 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Cache first strategy (for static assets)
async function handleCacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('📁 Failed to fetch static asset:', request.url);
    
    // Return a placeholder for failed static assets
    if (isImageRequest(request)) {
      return generatePlaceholderImage();
    }
    
    throw error;
  }
}

// Stale while revalidate strategy (for regular pages)
async function handleStaleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Image handling with placeholder fallback
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('🖼️ Image failed to load:', request.url);
    return generatePlaceholderImage();
  }
}

// Utility functions
function isNetworkFirstRequest(request) {
  return NETWORK_FIRST_PATTERNS.some(pattern => 
    request.url.includes(pattern)
  );
}

function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return /\.(css|js|woff|woff2|ttf|eot)$/i.test(url.pathname) ||
         url.pathname.startsWith('/_next/static/');
}

function generatePlaceholderImage() {
  // Generate a simple SVG placeholder
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0891b2;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#0e7490;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">CAPAS Bahamas</text>
      <text x="50%" y="60%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" opacity="0.8">Image unavailable offline</text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    }
  });
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'application-form') {
    event.waitUntil(syncApplicationForms());
  }
  
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForms());
  }
});

async function syncApplicationForms() {
  try {
    const pendingForms = await getStoredForms('pending-applications');
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removeStoredForm('pending-applications', form.id);
          console.log('✅ Application form synced successfully');
        }
      } catch (error) {
        console.warn('❌ Failed to sync application form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function syncContactForms() {
  try {
    const pendingForms = await getStoredForms('pending-contacts');
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removeStoredForm('pending-contacts', form.id);
          console.log('✅ Contact form synced successfully');
        }
      } catch (error) {
        console.warn('❌ Failed to sync contact form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// IndexedDB helpers for storing form data
async function getStoredForms(storeName) {
  // This would typically use IndexedDB
  // For now, return empty array as fallback
  return [];
}

async function removeStoredForm(storeName, formId) {
  // This would typically remove from IndexedDB
  // Implementation would depend on your IndexedDB setup
  console.log(`Removing form ${formId} from ${storeName}`);
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: data.url,
    actions: [
      {
        action: 'open',
        title: 'View Details',
        icon: '/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/icons/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data || '/')
    );
  }
});

console.log('🎯 CAPAS Bahamas Service Worker loaded successfully');