const CACHE='gewicht-v1';
const SHELL=['index.html','analysis.html','manifest.json',
  'icon-180.png','icon-192.png','icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const url=e.request.url;
  // never cache the Apps Script API calls — always go to network
  if(url.includes('script.google.com')||url.includes('googleusercontent')){
    return; // default network handling
  }
  // app shell: cache-first, fall back to network
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>{try{c.put(e.request,copy)}catch(_){}}); 
      return resp;
    }).catch(()=>r))
  );
});
