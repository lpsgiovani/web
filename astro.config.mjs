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
export default defineConfig({
    output: 'server', // Enable SSR for API routes and auth
    adapter: vercel({
        webAnalytics: { enabled: true },
        imageService: true,
    }),
    trailingSlash: 'always',
    build: {
        assets: '_assets-dev', // Isolation for sub-domain assets
        inlineStylesheets: 'always',
        modulePreload: { polyfill: false },
        format: 'directory',
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
    site: site,
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
                    entryFileNames: '_assets-dev/js/[name].[hash].js',
                    chunkFileNames: '_assets-dev/js/chunks/[name].[hash].js',
                    assetFileNames: '_assets-dev/[ext]/[name].[hash].[ext]',
                }
            }
        },
        ssr: {
            noExternal: ['@radix-ui/*'],
        },
    },
});
