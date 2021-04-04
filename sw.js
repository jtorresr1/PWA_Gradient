const CACHE_NAME = "v1_cache_degradador_app_vue";
const urlToCache = [
    "./",
    "./?umt_source=web_app_manifest",
    "./pages/fallback.html",
    "./img/favicon.png",
    "./img/icon32.png",
    "./img/icon64.png",
    "./img/icon128.png",
    "./img/icon192.png",      
    "./img/icon256.png",
    "./img/icon512.png",
    "./img/icon1024.png",
    "./js/main.js",
    "./css/style.css",
    "https://unpkg.com/vue@next",
    "./js/mountApp.js",
    "./manifest.json",
    "https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap"
];


self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>
        cache
            .addAll(urlToCache)
            .then(()=>self.skipWaiting())
            .catch((err) => console.log(err))
        )
    );
});


self.addEventListener("activate", (e)=>{
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if(cacheWhiteList.indexOf(cacheName)  == -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(()=> self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res)=>{
            if (res){
                return res;
            }
            return fetch(e.request);
        })
        .catch(()=>caches.match("./pages/fallback.html"))
    );
});