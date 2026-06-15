const CACHE='gewicht-v12';
const SHELL=['index.html','analysis.html','calories.html','calories-analysis.html',
  'training.html','strava.html','config.js','foods.js','manifest.json','icon-180.png','icon-192.png','icon-512.png'];

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
  if(e.request.method!=='GET')return;
  if(url.includes('script.google.com')||url.includes('googleusercontent')){return}

  // Icons & images: cache-first (they never change without a rename)
  if(e.request.destination==='image'){
    e.respondWith(
      caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
        const copy=resp.clone();
        caches.open(CACHE).then(c=>{try{c.put(e.request,copy)}catch(_){}});
        return resp;
      }))
    );
    return;
  }

  // HTML/JS/manifest: network-first so deployed updates arrive immediately,
  // with cache fallback for offline use.
  e.respondWith(
    fetch(e.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>{try{c.put(e.request,copy)}catch(_){}});
      return resp;
    }).catch(()=>caches.match(e.request))
  );
});
