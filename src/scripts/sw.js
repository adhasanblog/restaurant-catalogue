import 'regenerator-runtime/runtime';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

const manifest = self.__WB_MANIFEST;

manifest.push({
  url: 'manifest.json',
  revision: new Date().toISOString(),
});

clientsClaim();
skipWaiting();

precacheAndRoute(manifest, {
  handleFetch: 'staleWhileRevalidate',
  cleanupOutdatedCaches: true,
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

registerRoute(
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
  new StaleWhileRevalidate({
    cacheName: 'font-awesome-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);
