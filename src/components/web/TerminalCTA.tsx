'use client';

import { useState, useEffect } from 'react';

interface TerminalCTAProps {
    text: string;
    href: string;
    className?: string;
    delay?: string;
}

export default function TerminalCTA({ text, href, className = '', delay = 'delay-400' }: TerminalCTAProps) {
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(b => !b);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <a
            href={href}
            className={`group w-full md:w-auto h-14 md:h-14 px-6 md:px-10 text-sm md:text-base font-bold uppercase flex items-center justify-center gap-2 reveal-up ${delay}
                       bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                       hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                       transition-all duration-200 ${className}`}
        >
            <span className="font-mono flex items-center">
                {`> ${text}`}
                <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-0`}>_</span>
            </span>
        </a>
    );
}
