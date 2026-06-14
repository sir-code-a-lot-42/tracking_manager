// ============================================================
// Shared configuration & helpers — loaded by ALL pages.
// Single source of truth for storage keys, goals and the
// energy-expenditure model. Edit constants here, nowhere else.
// ============================================================
const WT = (() => {
  const APP_VERSION = 'v10';        // bump together with the sw.js CACHE name
  const CFG_KEY  = 'wt_cfg_v1';    // settings (url, token, height, age, sex, pal, base, sim targets)
  const DATA_KEY = 'wt_cache_v1';  // cached sheet data: { weight:[], intake:[], sport:[] }
  const QUEUE_KEY= 'wt_queue_v1';  // pending offline writes

  const START = 96;                       // starting weight (kg)
  const GOALS = [90, 85, 80, 75, 69];     // milestone targets (kg), descending

  // ---------- storage ----------
  function loadCfg(){ try{ return JSON.parse(localStorage.getItem(CFG_KEY)) || {} }catch(e){ return {} } }
  function saveCfg(c){ localStorage.setItem(CFG_KEY, JSON.stringify(c)) }
  function loadCacheObj(){
    try{
      const v = JSON.parse(localStorage.getItem(DATA_KEY));
      if(Array.isArray(v)) return { weight: v };   // legacy format
      return v || {};
    }catch(e){ return {} }
  }
  function saveCacheObj(o){ localStorage.setItem(DATA_KEY, JSON.stringify(o)) }
  function loadWeight(){ return loadCacheObj().weight || [] }
  function saveWeight(rows){ const c = loadCacheObj(); c.weight = rows; saveCacheObj(c) }
  function latestWeight(){
    const r = loadWeight();
    return r.length ? parseFloat(r[r.length - 1].kg) : null;
  }

  // ---------- misc ----------
  function esc(s){
    return String(s).replace(/[&<>"']/g, m =>
      ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]));
  }

  // ---------- energy model ----------
  // Mifflin–St Jeor BMR; returns null if age/sex not configured.
  function bmr(kg, cfg){
    cfg = cfg || loadCfg();
    const h   = parseFloat(cfg.height) || 168;
    const age = parseFloat(cfg.age);
    const sex = cfg.sex;
    if(!age || !(sex === 'm' || sex === 'f')) return null;
    return 10*kg + 6.25*h - 5*age + (sex === 'm' ? 5 : -161);
  }
  // Total daily energy expenditure at a given body weight.
  // Dynamic (BMR × PAL) when age+sex are set, otherwise the fixed base rate.
  // Note: keep PAL at a sedentary-ish 1.3–1.4 if you log watch workouts
  // separately, so sport isn't counted twice.
  function tdee(kg, cfg){
    cfg = cfg || loadCfg();
    const b = bmr(kg, cfg);
    if(b === null) return parseFloat(cfg.base) || 2500;
    return b * (parseFloat(cfg.pal) || 1.4);
  }

  // ---------- API ----------
  async function api(cfg, action, payload){
    if(!cfg.url || !cfg.token) throw new Error('not-configured');
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },   // no CORS preflight
      body: JSON.stringify(Object.assign({ action, token: cfg.token }, payload || {}))
    });
    const data = await res.json();
    if(!data.ok) throw new Error(data.error || 'error');
    return data;
  }

  // ---------- offline write queue ----------
  function loadQueue(){ try{ return JSON.parse(localStorage.getItem(QUEUE_KEY)) || [] }catch(e){ return [] } }
  function saveQueue(q){ localStorage.setItem(QUEUE_KEY, JSON.stringify(q)) }
  // payload must contain {action, table, date, ...}
  function queue(payload){ const q = loadQueue(); q.push({ payload, ts: Date.now() }); saveQueue(q) }
  async function flushQueue(cfg){
    cfg = cfg || loadCfg();
    if(!cfg.url || !cfg.token) return 0;
    let q = loadQueue();
    if(!q.length) return 0;
    let sent = 0; const rest = [];
    for(const item of q){
      try{ await api(cfg, item.payload.action || 'add', item.payload); sent++ }
      catch(e){ rest.push(item) }
    }
    saveQueue(rest);
    return sent;
  }

  // ---------- version badge ----------
  // Tiny corner indicator so it's always visible which deployed version is
  // actually running (debugging aid for service-worker update lag).
  function showVersionBadge(){
    const b = document.createElement('div');
    b.textContent = APP_VERSION;
    b.style.cssText = 'position:fixed;top:3px;right:5px;font-size:9px;color:#5a616d;' +
      'font-family:ui-monospace,monospace;z-index:5;pointer-events:none;opacity:.8';
    document.body.appendChild(b);
  }
  if(document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', showVersionBadge);
  else showVersionBadge();

  return { APP_VERSION, CFG_KEY, DATA_KEY, START, GOALS,
           loadCfg, saveCfg, loadCacheObj, saveCacheObj, loadWeight, saveWeight, latestWeight,
           esc, bmr, tdee, api, queue, flushQueue, loadQueue };
})();
