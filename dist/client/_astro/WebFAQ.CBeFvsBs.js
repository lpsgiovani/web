import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.WFquGv8Z.js";import{c as f}from"./analytics.B3WIDXpg.js";/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),m=(...t)=>t.filter((a,r,i)=>!!a&&a.trim()!==""&&i.indexOf(a)===r).join(" ").trim();/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=n.forwardRef(({color:t="currentColor",size:a=24,strokeWidth:r=2,absoluteStrokeWidth:i,className:e="",children:o,iconNode:c,...d},u)=>n.createElement("svg",{ref:u,...b,width:a,height:a,stroke:t,strokeWidth:i?Number(r)*24/Number(a):r,className:m("lucide",e),...d},[...c.map(([p,g])=>n.createElement(p,g)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(t,a)=>{const r=n.forwardRef(({className:i,...e},o)=>n.createElement(x,{ref:o,iconNode:a,className:m(`lucide-${v(t)}`,i),...e}));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],q=h("ChevronDown",w),l=[{q:"Vocês usam WordPress?",a:"Evitamos WordPress para projetos de alta performance. Utilizamos tecnologias modernas como Astro e Next.js, que garantem segurança superior, velocidade extrema e zero manutenção constante de plugins."},{q:"O site é otimizado para SEO?",a:"Sim, o SEO é nativo em nossa metodologia. Entregamos o site com estrutura semântica correta, meta-tags dinâmicas, sitemap automático e otimização de performance, garantindo que o Google 'leia' e priorize seu site."},{q:"Consigo editar o conteúdo depois?",a:"Com certeza. Caso opte por um Sistema de Gerenciamento de Conteúdo (CMS), integramos seu site a um CMS headless. Você terá um painel intuitivo para alterar textos, trocar imagens e criar novas páginas de blog ou produtos sem precisar tocar em uma linha de código."},{q:"Quanto tempo demora para ficar pronto?",a:"Sites institucionais e Landing Pages levam em média de 2 a 4 semanas. E-commerces e projetos complexos podem variar de 6 a 8 semanas."},{q:"O site vai funcionar em celulares?",a:"Desenvolvemos com a metodologia 'Mobile First'. Seu site será perfeitamente responsivo, adaptando-se fluidamente a qualquer tamanho de tela, garantindo a melhor experiência para usuários móveis."}];function N(){const[t,a]=n.useState(null),r=n.useRef(null);n.useEffect(()=>{const e=new IntersectionObserver(o=>{o.forEach(c=>{c.isIntersecting&&(c.target.classList.add("active"),e.unobserve(c.target))})},{threshold:.1});return r.current&&r.current.querySelectorAll(".reveal-up").forEach(c=>e.observe(c)),()=>e.disconnect()},[]);const i=e=>{const o=t!==e;a(t===e?null:e),o&&l[e]&&f("faq_expanded",{faq_question:l[e].q,faq_index:e,source:"web_lp"})};return s.jsx("section",{className:"cv-auto py-20 px-6 md:py-32 bg-background-light text-primary",children:s.jsxs("div",{className:"max-w-xl md:max-w-2xl mx-auto",children:[s.jsx("h3",{className:"text-xl font-bold uppercase mb-8 border-b border-black pb-2 reveal-up",children:"Dúvidas Frequentes"}),s.jsx("div",{ref:r,className:"space-y-4",children:l.map((e,o)=>s.jsxs("div",{className:"border-b border-black/20 dark:border-white/20 pb-4 reveal-up delay-100",children:[s.jsxs("button",{type:"button",onClick:()=>i(o),className:"accordion-trigger flex items-center justify-between w-full text-left group cursor-pointer outline-none py-2",children:[s.jsx("span",{className:"text-lg md:text-xl font-bold",children:e.q}),s.jsx(q,{className:`transition-transform duration-300 icon-toggle ${t===o?"rotate-180":""}`})]}),s.jsx("div",{className:`accordion-content ${t===o?"block":"hidden"} mt-4 text-base leading-relaxed opacity-80 font-serif`,children:e.a})]},o))})]})})}export{N as default};
