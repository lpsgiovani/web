'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { captureEvent } from '@/lib/analytics';

export default function WebFooterCTA() {
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(b => !b);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const handleCtaClick = () => {
        captureEvent('cta_clicked', {
            cta_text: '> INICIAR_',
            cta_location: 'web_footer'
        });
    };

    return (
        <a
            href="/briefing"
            onClick={handleCtaClick}
            className="w-[92%] md:w-full h-16 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-2 max-w-sm md:mx-auto reveal-up delay-300
                       bg-white text-black border-2 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] 
                       hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
                       transition-all duration-200"
        >
            <span className="font-mono flex items-center">
                {`> INICIAR`}
                <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-0`}>_</span>
            </span>
        </a>
    );
}
