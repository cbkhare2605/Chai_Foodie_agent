const CACHE = 'foodie-v10';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './logo/Foodie_white.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('fetch', e => {
  const isHtml = e.request.mode === 'navigate' || e.request.url.endsWith('.html') || (e.request.url.match(/\/$/) && !e.request.url.includes('.'));
  const req = isHtml ? new Request(e.request, { cache: 'reload' }) : e.request;
  e.respondWith(fetch(req).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
