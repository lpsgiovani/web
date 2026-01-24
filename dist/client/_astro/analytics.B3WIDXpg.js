const n=(o,t)=>{if(typeof window<"u"&&window.posthog)try{window.posthog.capture(o,t)}catch(e){console.warn("PostHog capture failed:",e)}};export{n as c};
