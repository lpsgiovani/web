/**
 * Analytics utility to interact with third-party scripts via global proxies.
 * This avoids bundling heavy libraries like 'posthog-js' in the main bundle.
 */

interface PostHogProxy {
    capture: (event: string, properties?: Record<string, any>) => void;
    identify: (distinctId: string, properties?: Record<string, any>) => void;
    alias: (alias: string, original: string) => void;
    people: {
        set: (properties: Record<string, any>) => void;
        set_once: (properties: Record<string, any>) => void;
    };
    captureException: (error: Error | any) => void;
    [key: string]: any;
}

declare global {
    interface Window {
        posthog?: PostHogProxy;
        fbq?: any;
        dataLayer?: any[];
    }
}

/**
 * Capture an event in PostHog safely.
 */
export const captureEvent = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.posthog) {
        try {
            window.posthog.capture(event, properties);
        } catch (e) {
            console.warn('PostHog capture failed:', e);
        }
    }
};

/**
 * Capture an exception in PostHog safely.
 */
export const captureException = (error: any) => {
    if (typeof window !== 'undefined' && window.posthog) {
        try {
            window.posthog.captureException(error);
        } catch (e) {
            console.warn('PostHog captureException failed:', e);
        }
    }
};

/**
 * Track PageView in Meta Pixel safely.
 */
export const trackPixelEvent = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
        try {
            window.fbq('track', event, properties);
        } catch (e) {
            console.warn('Meta Pixel track failed:', e);
        }
    }
};

/**
 * Push to DataLayer (GTM) safely.
 */
export const pushToDataLayer = (data: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
        try {
            window.dataLayer.push(data);
        } catch (e) {
            console.warn('DataLayer push failed:', e);
        }
    }
};
