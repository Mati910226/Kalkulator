{\rtf1\ansi\ansicpg1250\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const CACHE_NAME = "zywice-cache-v1";\
\
const FILES_TO_CACHE = [\
  "./",\
  "./index.html",\
  "./manifest.json",\
  "./icon.png"\
];\
\
// Instalacja \'97 zapis plik\'f3w do cache\
self.addEventListener("install", (event) => \{\
  event.waitUntil(\
    caches.open(CACHE_NAME).then((cache) => \{\
      return cache.addAll(FILES_TO_CACHE);\
    \})\
  );\
  self.skipWaiting();\
\});\
\
// Aktywacja \'97 czyszczenie starego cache\
self.addEventListener("activate", (event) => \{\
  event.waitUntil(\
    caches.keys().then((keys) => \{\
      return Promise.all(\
        keys.map((key) => \{\
          if (key !== CACHE_NAME) \{\
            return caches.delete(key);\
          \}\
        \})\
      );\
    \})\
  );\
  self.clients.claim();\
\});\
\
// Fetch \'97 tryb offline-first\
self.addEventListener("fetch", (event) => \{\
  event.respondWith(\
    caches.match(event.request).then((cached) => \{\
      return (\
        cached ||\
        fetch(event.request).catch(() => caches.match("./index.html"))\
      );\
    \})\
  );\
\});}