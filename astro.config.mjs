import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config - Force Rebuild v1.1.1
export default defineConfig({
    output: 'server', // Enable SSR for API routes and auth
    adapter: vercel({
        webAnalytics: { enabled: true },
        imageService: true,
    }),
    build: {
        inlineStylesheets: 'always',
        modulePreload: { polyfill: false },
    },
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'viewport',
    },
    integrations: [
        react(), // Enable React components as islands
        tailwind(), // Uses tailwind.config.js automatically
        sitemap(), // Generate sitemap.xml
        partytown({
            config: {
                forward: ['fbq', 'posthog.init', 'posthog.capture', 'dataLayer.push'],
            },
        }),
    ],
    site: 'https://primitiva.cc',
    vite: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            target: 'esnext',
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                }
            }
        },
        ssr: {
            noExternal: ['@radix-ui/*'],
        },
    },
});
