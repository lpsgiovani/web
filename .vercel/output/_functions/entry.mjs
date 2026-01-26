import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './_assets-dev/js/chunks/_@astrojs-ssr-adapter.DapjV_PT.js';
import { manifest } from './manifest_W5pwarfk.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/projetos/pedecafe.astro.mjs');
const _page2 = () => import('./pages/projetos/_slug_.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/projetos/pedecafe.astro", _page1],
    ["src/pages/projetos/[slug].astro", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "625185d8-4b60-434d-b395-d8d58660d234",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
