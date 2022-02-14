/// <reference lib="webworker" />

import 'regenerator-runtime'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'

// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope

clientsClaim()
cleanupOutdatedCaches()
self.addEventListener('install', event => {
  self.skipWaiting()
})

// const appVer = '1.0'

setCacheNameDetails({
  prefix: 'whats-sender',
  // suffix: appVer,
  precache: 'precache',
  runtime: 'runtime'
})

const WorkBoxManifest = self.__WB_MANIFEST
precacheAndRoute(WorkBoxManifest)

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  }),
  'GET'
)

// Cache the underlying font files with a cache-first strategy for 30 days.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * (60 * 60 * 24), // 30 Days
        maxEntries: 30,
        purgeOnQuotaError: true
      })
    ]
  }),
  'GET'
)

// Cache fonts
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2)$/i,
  new CacheFirst({
    cacheName: 'static-font-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 7 * (60 * 60 * 24),
        purgeOnQuotaError: true
      })
    ]
  }),
  'GET'
)

// Cache images
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new CacheFirst({
    cacheName: 'static-image-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 7 * (60 * 60 * 24),
        purgeOnQuotaError: true
      })
    ]
  }),
  'GET'
)

// Cache dataset
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkFirst({
    cacheName: 'static-data-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 7 * (60 * 60 * 24),
        purgeOnQuotaError: true
      })
    ]
  }),
  'GET'
)

// // Cache javascript
// registerRoute(
//   /\.(?:js)$/i,
//   new NetworkFirst({
//     cacheName: 'static-js-assets',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 32,
//         maxAgeSeconds: 7 * (60 * 60 * 24),
//         purgeOnQuotaError: true
//       })
//     ]
//   }),
//   'GET'
// )

// // Cache stylesheet
// registerRoute(
//   /\.(?:css|less)$/i,
//   new NetworkFirst({
//     cacheName: 'static-style-assets',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 32,
//         maxAgeSeconds: 7 * (60 * 60 * 24),
//         purgeOnQuotaError: true
//       })
//     ]
//   }),
//   'GET'
// )

// // Cache other
// registerRoute(
//   /.*/i,
//   new NetworkFirst({
//     cacheName: 'others',
//     networkTimeoutSeconds: 10,
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 32,
//         maxAgeSeconds: 7 * (60 * 60 * 24),
//         purgeOnQuotaError: true
//       })
//     ]
//   }),
//   'GET'
// )
