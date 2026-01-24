/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: {
                    light: '#F8F5F0',
                    dark: '#0A0A0A',
                },
                primary: '#181010',
            },
            fontFamily: {
                display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
                mono: ['var(--font-space-mono)', 'Space Mono', 'monospace'],
                serif: ['var(--font-instrument-serif)', 'Instrument Serif', 'serif'],
            },
            animation: {
                'reveal-up': 'reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'reveal-text': 'reveal-text 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'line-grow': 'line-grow 0.8s ease-out forwards',
            },
            keyframes: {
                'reveal-up': {
                    '0%': { opacity: '0', transform: 'translate3d(0, 30px, 0)' },
                    '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
                },
                'reveal-text': {
                    '0%': { opacity: '0', transform: 'translate3d(0, 15px, 0)' },
                    '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'line-grow': {
                    '0%': { transform: 'scaleX(0)' },
                    '100%': { transform: 'scaleX(1)' },
                },
            },
        },
    },
    plugins: [],
}
