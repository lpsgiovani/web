import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const site = 'https://dev.primitiva.cc';

export default defineConfig({
    output: 'static',
    trailingSlash: 'always',
    site,

    build: {
        inlineStylesheets: 'auto',
        modulePreload: { polyfill: false },
        format: 'directory',
    },

    prefetch: {
        prefetchAll: false,
        defaultStrategy: 'hover',
    },

    integrations: [
        react(),
        tailwind(),
        sitemap(),
        partytown({
            config: {
                forward: ['fbq', 'posthog.init', 'posthog.capture', 'dataLayer.push'],
                lib: '/~partytown/',
            },
        }),
    ],

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
            assetsInlineLimit: 4096,
        },
    },
});
