'use client';

import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
    {
        id: 'SRV_01',
        title: "Design",
        description: "Identidades visuais de alto impacto que são impossíveis de ignorar. Estética focada na experiência do usuário e memorabilidade da marca.",
        log: "VISUAL_IDENTITY.EXE",
        visual: (
            <svg viewBox="0 0 100 60" className="w-24 h-auto opacity-40 group-hover:opacity-100 transition-opacity fill-none stroke-current stroke-[0.5]">
                <rect x="5" y="5" width="90" height="50" />
                <line x1="5" y1="15" x2="95" y2="15" />
                <rect x="15" y="25" width="30" height="5" />
                <rect x="15" y="35" width="70" height="2" />
                <rect x="15" y="40" width="70" height="2" />
                <rect x="15" y="45" width="20" height="5" strokeWidth="1" />
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            </svg>
        )
    },
    {
        id: 'SRV_02',
        title: "Estratégia",
        description: "Inteligência de dados para conversão. Modelagem de decisões baseada em comportamentos reais para garantir autoridade.",
        log: "STRATEGY.LOG",
        visual: (
            <svg viewBox="0 0 100 60" className="w-24 h-auto opacity-40 group-hover:opacity-100 transition-opacity fill-none stroke-current stroke-[0.5]">
                <rect x="40" y="5" width="20" height="10" />
                <line x1="50" y1="15" x2="50" y2="25" />
                <line x1="20" y1="25" x2="80" y2="25" />
                <line x1="20" y1="25" x2="20" y2="35" />
                <line x1="50" y1="25" x2="50" y2="35" />
                <line x1="80" y1="25" x2="80" y2="35" />
                <rect x="10" y="35" width="20" height="15" />
                <rect x="40" y="35" width="20" height="15" />
                <rect x="70" y="35" width="20" height="15" />
            </svg>
        )
    },
    {
        id: 'SRV_03',
        title: "Performance",
        description: "Código proprietário em Next.js e Astro. Performance extrema com Nota 99+ no Lighthouse e SEO nativo.",
        log: "CORE_PERFORMANCE.SYS",
        visual: (
            <svg viewBox="0 0 100 60" className="w-24 h-auto opacity-40 group-hover:opacity-100 transition-opacity fill-none stroke-current stroke-[0.5]">
                <circle cx="50" cy="45" r="35" strokeDasharray="1 4" strokeLinecap="round" />
                <path d="M50 45 L80 20" strokeWidth="1" />
                <circle cx="50" cy="45" r="3" fill="currentColor" />
                <path d="M20 55 Q 50 10 80 55" strokeDasharray="2 2" />
            </svg>
        )
    }
];

export default function WebServices() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight / 2;
            const totalDistance = rect.height;
            const currentPos = start - rect.top;

            const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="bg-black text-white py-24 md:py-48 px-6 border-b border-white/10 relative overflow-hidden selection:bg-white selection:text-black">
            {/* Background Circuit Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="mb-24 md:mb-40 text-center reveal-up">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 block mb-4">/ NOSSA_EXPERTISE</span>
                    <h2 className="text-4xl md:text-7xl font-serif italic tracking-tight">
                        Sistemas que <span className="text-white/40">convertem.</span>
                    </h2>
                </div>

                {/* Main Circuit Container */}
                <div ref={containerRef} className="relative">

                    {/* DESKTOP: Horizontal Circuit Line */}
                    <div className="hidden md:block absolute top-[50%] left-[16.66%] right-[16.66%] h-[1px] bg-zinc-800 overflow-hidden">
                        <div className="w-[50%] h-full bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] opacity-80 animate-circuit-flow" />
                    </div>

                    {/* MOBILE: Vertical Timeline Line (Base) */}
                    <div className="md:hidden absolute left-[21px] top-[7px] bottom-[7px] w-[1px] bg-white/5" />

                    {/* MOBILE: Vertical Timeline Line (Scroll Progress) */}
                    <div
                        style={{ height: `${scrollProgress * 100}%` }}
                        className="md:hidden absolute left-[21px] top-[7px] w-[1px] bg-gradient-to-b from-transparent via-white to-transparent opacity-80 z-10 transition-all duration-300 ease-out"
                    />

                    {/* Services Loop */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-16 md:gap-0">
                        {SERVICES.map((item, idx) => (
                            <div
                                key={item.id}
                                className="group relative w-full md:w-1/3 flex flex-col items-start md:items-center px-4"
                            >
                                {/* Node (Square) */}
                                <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 z-20">
                                    <div
                                        className="w-3 h-3 border border-zinc-700 bg-black group-hover:border-white transition-colors duration-300 animate-node-pulse"
                                        style={{ animationDelay: `${idx * 1.5}s` }}
                                    />
                                </div>

                                {/* Content: Title Area */}
                                <div className="pl-12 md:pl-0 md:pb-16 w-full md:text-center order-1 transition-all duration-500 md:group-hover:-translate-y-2">
                                    <div className="flex items-center md:justify-center gap-3 mb-2">
                                        <span className="font-mono text-[10px] text-zinc-600 tracking-widest">[0{idx + 1}]</span>
                                        <h3 className="font-mono text-lg md:text-2xl font-bold uppercase tracking-tighter">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="hidden md:flex justify-center mb-4">
                                        {item.visual}
                                    </div>
                                </div>

                                {/* Content: Description Area */}
                                <div className="pl-12 md:pl-0 md:pt-16 w-full md:text-center order-2 transition-all duration-500 opacity-70 group-hover:opacity-100 md:group-hover:translate-y-2">
                                    <p className="font-sans text-[13px] md:text-base leading-relaxed max-w-[280px] md:mx-auto">
                                        {item.description}
                                    </p>

                                    {/* Desktop Blueprint Annotations */}
                                    <div className="hidden md:flex mt-6 items-center md:justify-center gap-4 font-mono text-[8px] tracking-[0.3em] text-white/10 uppercase">
                                        <span>Scale: 1:1</span>
                                        <span className="hidden md:inline">/</span>
                                        <span>Status: {item.log}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-24"></div>
            </div>
        </section>
    );
}
