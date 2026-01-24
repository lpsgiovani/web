import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_DmLJyB8D.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B4dtk6ok.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/","cacheDir":"file:///C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/node_modules/.astro/","outDir":"file:///C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/dist/","srcDir":"file:///C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/","publicDir":"file:///C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/public/","buildClientDir":"file:///C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/dist/client/","buildServerDir":"file:///C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.sJrt8mpm.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"},{"stage":"head-inline","children":"!(function(w,p,f,c){if(!window.crossOriginIsolated && !navigator.serviceWorker) return;c=w[p]=Object.assign(w[p]||{},{\"lib\":\"/~partytown/\",\"debug\":false});c[f]=(c[f]||[]).concat([\"fbq\",\"posthog.init\",\"posthog.capture\",\"dataLayer.push\"])})(window,'partytown','forward');/* Partytown 0.11.2 - MIT QwikDev */\nconst t={preserveBehavior:!1},e=e=>{if(\"string\"==typeof e)return[e,t];const[n,r=t]=e;return[n,{...t,...r}]},n=Object.freeze((t=>{const e=new Set;let n=[];do{Object.getOwnPropertyNames(n).forEach((t=>{\"function\"==typeof n[t]&&e.add(t)}))}while((n=Object.getPrototypeOf(n))!==Object.prototype);return Array.from(e)})());!function(t,r,o,i,a,s,c,l,d,p,u=t,f){function h(){f||(f=1,\"/\"==(c=(s.lib||\"/~partytown/\")+(s.debug?\"debug/\":\"\"))[0]&&(d=r.querySelectorAll('script[type=\"text/partytown\"]'),i!=t?i.dispatchEvent(new CustomEvent(\"pt1\",{detail:t})):(l=setTimeout(v,(null==s?void 0:s.fallbackTimeout)||1e4),r.addEventListener(\"pt0\",w),a?y(1):o.serviceWorker?o.serviceWorker.register(c+(s.swPath||\"partytown-sw.js\"),{scope:c}).then((function(t){t.active?y():t.installing&&t.installing.addEventListener(\"statechange\",(function(t){\"activated\"==t.target.state&&y()}))}),console.error):v())))}function y(e){p=r.createElement(e?\"script\":\"iframe\"),t._pttab=Date.now(),e||(p.style.display=\"block\",p.style.width=\"0\",p.style.height=\"0\",p.style.border=\"0\",p.style.visibility=\"hidden\",p.setAttribute(\"aria-hidden\",!0)),p.src=c+\"partytown-\"+(e?\"atomics.js?v=0.11.2\":\"sandbox-sw.html?\"+t._pttab),r.querySelector(s.sandboxParent||\"body\").appendChild(p)}function v(n,o){for(w(),i==t&&(s.forward||[]).map((function(n){const[r]=e(n);delete t[r.split(\".\")[0]]})),n=0;n<d.length;n++)(o=r.createElement(\"script\")).innerHTML=d[n].innerHTML,o.nonce=s.nonce,r.head.appendChild(o);p&&p.parentNode.removeChild(p)}function w(){clearTimeout(l)}s=t.partytown||{},i==t&&(s.forward||[]).map((function(r){const[o,{preserveBehavior:i}]=e(r);u=t,o.split(\".\").map((function(e,r,o){var a;u=u[o[r]]=r+1<o.length?u[o[r]]||(a=o[r+1],n.includes(a)?[]:{}):(()=>{let e=null;if(i){const{methodOrProperty:n,thisObject:r}=((t,e)=>{let n=t;for(let t=0;t<e.length-1;t+=1)n=n[e[t]];return{thisObject:n,methodOrProperty:e.length>0?n[e[e.length-1]]:void 0}})(t,o);\"function\"==typeof n&&(e=(...t)=>n.apply(r,...t))}return function(){let n;return e&&(n=e(arguments)),(t._ptf=t._ptf||[]).push(o,arguments),n}})()}))})),\"complete\"==r.readyState?h():(t.addEventListener(\"DOMContentLoaded\",h),t.addEventListener(\"load\",h))}(window,document,navigator,top,window.crossOriginIsolated);;(e=>{e.addEventListener(\"astro:before-swap\",e=>{let r=document.body.querySelector(\"iframe[src*='/~partytown/']\");if(r)e.newDocument.body.append(r)})})(document);"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}}],"site":"https://primitiva.cc","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_XZ6uxSxo.mjs","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/node_modules/@astrojs/vercel/dist/image/build-service.js":"chunks/build-service_BQO-0OM_.mjs","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/WebServices":"_astro/WebServices.Cbh4O2Ky.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/WebTestimonials":"_astro/WebTestimonials.1IQE-_oA.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/WebFAQ":"_astro/WebFAQ.D--gUp4I.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/HeaderStatusLine":"_astro/HeaderStatusLine.BbM9xk7R.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/WebFooterCTA":"_astro/WebFooterCTA.CO4S0GfT.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/PerformanceCounter":"_astro/PerformanceCounter.DizDnAIG.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/astro/TechOverviewMobile.tsx":"_astro/TechOverviewMobile.D_ljZX9n.js","@astrojs/react/client.js":"_astro/client.9unXo8s5.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/layouts/WebLayout.astro?astro&type=script&index=0&lang.ts":"_astro/WebLayout.astro_astro_type_script_index_0_lang.DlXB7rVx.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/astro/WebHero.astro?astro&type=script&index=0&lang.ts":"_astro/WebHero.astro_astro_type_script_index_0_lang.DeeWFvEb.js","C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/WebAbout.astro?astro&type=script&index=0&lang.ts":"_astro/WebAbout.astro_astro_type_script_index_0_lang.Bh8cQxBs.js","astro:scripts/page.js":"_astro/page.sJrt8mpm.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/giova/Desktop/Mesa/Primitiva/primitiva-web-export/src/components/web/WebAbout.astro?astro&type=script&index=0&lang.ts","const u=()=>{const s=document.getElementById(\"about-carousel\"),r=document.querySelectorAll(\".about-dot\");if(s&&r.length>0){const e=()=>{const t=s.scrollLeft,n=s.offsetWidth,l=Math.round(t/n);r.forEach((d,i)=>{const o=d;i===l?(o.classList.add(\"bg-white\"),o.classList.remove(\"bg-transparent\")):(o.classList.remove(\"bg-white\"),o.classList.add(\"bg-transparent\"))})};s.addEventListener(\"scroll\",e,{passive:!0})}const c={threshold:.15,rootMargin:\"0px 0px -50px 0px\"},a=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add(\"active\"),a.unobserve(t.target))})},c);document.querySelectorAll(\".reveal-encaixe-1, .reveal-encaixe-2\").forEach(e=>{a.observe(e)})};document.addEventListener(\"astro:page-load\",u);"]],"assets":["/_astro/pedecafe_responsive.DgcttdB6.webp","/robots.txt","/favicon/android-chrome-192x192.png","/favicon/android-chrome-512x512.png","/favicon/apple-touch-icon.png","/favicon/favicon-16x16.png","/favicon/favicon-32x32.png","/favicon/favicon.ico","/favicon/site.webmanifest","/fonts/InstrumentSerif-Italic.woff","/fonts/InstrumentSerif-Italic.woff2","/fonts/InstrumentSerif-Regular.woff","/fonts/InstrumentSerif-Regular.woff2","/fonts/material-symbols-outlined-normal-100700.woff2","/fonts/space-grotesk-normal-300.woff2","/fonts/space-grotesk-normal-400.woff2","/fonts/space-grotesk-normal-500.woff2","/fonts/space-grotesk-normal-600.woff2","/fonts/space-grotesk-normal-700.woff2","/fonts/space-mono-italic-400.woff2","/fonts/space-mono-normal-400.woff2","/fonts/space-mono-normal-700.woff2","/_astro/analytics.B3WIDXpg.js","/_astro/client.9unXo8s5.js","/_astro/HeaderStatusLine.BbM9xk7R.js","/_astro/index.WFquGv8Z.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/nprogress.8qsPAS8G.js","/_astro/page.sJrt8mpm.js","/_astro/PerformanceCounter.DizDnAIG.js","/_astro/TechOverviewMobile.D_ljZX9n.js","/_astro/use-transform.BvxJ2OKz.js","/_astro/WebFAQ.D--gUp4I.js","/_astro/WebFooterCTA.CO4S0GfT.js","/_astro/WebHero.astro_astro_type_script_index_0_lang.DeeWFvEb.js","/_astro/WebLayout.astro_astro_type_script_index_0_lang.DlXB7rVx.js","/_astro/WebServices.Cbh4O2Ky.js","/_astro/WebTestimonials.1IQE-_oA.js","/assets/fonts/material-symbols-outlined-normal-100700.woff2","/assets/fonts/playfair-display-italic-400.woff2","/assets/fonts/playfair-display-normal-400.woff2","/assets/fonts/playfair-display-normal-600.woff2","/assets/fonts/space-grotesk-normal-300.woff2","/assets/fonts/space-grotesk-normal-400.woff2","/assets/fonts/space-grotesk-normal-500.woff2","/assets/fonts/space-grotesk-normal-600.woff2","/assets/fonts/space-grotesk-normal-700.woff2","/assets/fonts/space-mono-italic-400.woff2","/assets/fonts/space-mono-normal-400.woff2","/assets/fonts/space-mono-normal-700.woff2","/assets/css/output.css","/assets/oqfjf/asset1.webp","/assets/oqfjf/asset2.webp","/assets/oqfjf/bag1.webp","/assets/oqfjf/bag2.webp","/assets/oqfjf/bag3.webp","/assets/oqfjf/bag4.webp","/assets/oqfjf/bag5.webp","/assets/oqfjf/capitur.webp","/assets/primitiva/about_us.webp","/assets/primitiva/giovani.jpg","/assets/primitiva/primitiva_logo.svg","/assets/primitiva/tempone.png","/assets/primitiva/thumb.jpg","/assets/ninho/image/asset1.webp","/assets/ninho/image/asset2.jpg","/assets/ninho/image/asset2_mobile.jpg","/assets/ninho/image/asset3.webp","/assets/ninho/image/asset4.webp","/assets/ninho/lottie/scene.lottie","/assets/pedecafe/image/asset1.webp","/assets/pedecafe/image/asset2.webp","/assets/pedecafe/image/combo_desktop.webp","/assets/pedecafe/image/combo_mobile.webp","/assets/pedecafe/lottie/desktop/animation1.lottie","/assets/pedecafe/lottie/desktop/animation2.lottie","/assets/pedecafe/lottie/mobile/animation1.lottie","/assets/pedecafe/lottie/mobile/animation2.lottie","/_astro/page.sJrt8mpm.js","/index.html","/~partytown/partytown-atomics.js","/~partytown/partytown-media.js","/~partytown/partytown-sw.js","/~partytown/partytown.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"GeScf5IDQO64ty4z1t5tCBVvcocKeghkzIiaU09nAi0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
