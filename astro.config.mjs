import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';
const site = isDev ? 'https://dev.primitiva.cc' : 'https://primitiva.cc';

// https://astro.build/config - Force Rebuild v1.1.2
// https://astro.build/config - Force Rebuild v1.1.3 (Stability Fixes)
export default defineConfig({
    output: 'static', // Pre-render all pages at build time
    webAnalytics: { enabled: true },
    // Use Vercel Image Optimization in Production AND Preview, only disable locally
    imageService: true,
    // Optimization: Cache generated static assets
    isr: false,
}),
trailingSlash: 'always', // Maintain consistency for SEO
    build: {
    // assets: '_assets-dev', 
    inlineStylesheets: 'auto', // FIXED: 'always' was causing corrupted content on slow connections
        modulePreload: { polyfill: false },
    format: 'directory',
    },
prefetch: {
    prefetchAll: false, // FIXED: Disable aggressive prefetch to prevent network congestion
        defaultStrategy: 'hover', // Only prefetch on explicit user intent
    },
integrations: [
    react(),
    tailwind(),
    sitemap(),
    partytown({
        config: {
            forward: ['fbq', 'posthog.init', 'posthog.capture', 'dataLayer.push'],
            lib: '/~partytown/', // FIXED: Ensure correct path resolution on Vercel
        },
    }),
],
    site: site,
        vite: {
    server: {
        allowedHosts: ['apryl-unawkward-nontemperamentally.ngrok-free.dev'],
        },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            },
    },
    build: {
        target: 'esnext',
            // Ensure assets are not inlined if too large, preventing corruption
            assetsInlineLimit: 4096,
        },
    ssr: {
        noExternal: ['@radix-ui/*'],
        },
},
});
