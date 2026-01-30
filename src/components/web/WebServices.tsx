'use client';

import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
    {
        id: 'SRV_01',
        title: "Estratégia",
        description: "Antes de codificar, desenhamos o caminho para a sua escala. Unimos análise de mercado e design de experiência para garantir que cada decisão tenha um objetivo comercial.",
        log: "STRATEGY.LOG"
    },
    {
        id: 'SRV_02',
        title: "Design",
        description: "Nossa expertise em UX/UI é fundida à estratégia de marca. Desenvolvemos interfaces que transformam a essência do seu negócio em uma presença digital impossível de ignorar.",
        log: "VISUAL_IDENTITY.EXE"
    },
    {
        id: 'SRV_03',
        title: "Performance",
        description: "Utilizamos arquiteturas modernas que garantem segurança absoluta e zero custo de manutenção constante com plugins ou instabilidades.",
        log: "CORE_PERFORMANCE.SYS"
    }
];

export default function WebServices() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (!containerRef.current) return;

                    const rect = containerRef.current.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const start = windowHeight / 2;
                    const totalDistance = rect.height;
                    const currentPos = start - rect.top;

                    const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);
                    setScrollProgress(progress);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial calculation
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight / 2;
            const totalDistance = rect.height;
            const currentPos = start - rect.top;
            setScrollProgress(Math.min(Math.max(currentPos / totalDistance, 0), 1));
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="expertise" className="bg-white text-black py-24 md:py-40 px-6 border-b border-black/5 relative overflow-hidden selection:bg-black selection:text-white">


            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="mb-16 md:mb-24 text-center px-6 reveal-up">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-black/30 block mb-6">/ NOSSA_EXPERTISE</span>
                    <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] tracking-tighter">
                        Sistemas que <br /><span className="italic text-black/40">convertem.</span>
                    </h2>
                </div>

                {/* Main Circuit Container */}
                <div ref={containerRef} className="relative">

                    {/* DESKTOP: Horizontal Circuit Line */}
                    <div className="hidden md:block absolute top-[100px] left-[102px] right-[calc(33.33%-102px)] h-[1px] bg-zinc-200 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent blur-[1px] animate-circuit-flow" />
                    </div>

                    {/* MOBILE: Vertical Timeline Line (Base) */}
                    <div className="md:hidden absolute left-[21px] top-[7px] bottom-[7px] w-[1px] bg-zinc-200" />

                    {/* MOBILE: Vertical Timeline Line (Scroll Progress) */}
                    <div
                        style={{ height: `${scrollProgress * 100}%` }}
                        className="md:hidden absolute left-[21px] top-[7px] w-[1px] bg-gradient-to-b from-transparent via-black to-transparent opacity-80 z-10 transition-all duration-300 ease-out"
                    />

                    {/* Services Loop */}
                    <div className="flex flex-col md:flex-row justify-between items-start relative gap-16 md:gap-0">
                        {SERVICES.map((item, idx) => (
                            <div
                                key={item.id}
                                className="group relative w-full md:w-1/3 flex flex-col items-start"
                            >
                                {/* Node (Square) */}
                                <div className="absolute left-[15px] md:left-24 top-1.5 md:top-[100px] md:-translate-y-1/2 z-20">
                                    <div
                                        className="w-3 h-3 border border-zinc-300 bg-white group-hover:bg-black group-hover:border-black transition-all duration-300"
                                        style={{ animationDelay: `${idx * 1.5}s` }}
                                    />
                                </div>

                                {/* Content: Title Area */}
                                <div className="pl-12 md:pl-24 md:h-[100px] flex flex-col justify-end pb-3 w-full text-left transition-all duration-500 md:group-hover:-translate-y-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-mono text-[10px] text-zinc-400 tracking-widest">[0{idx + 1}]</span>
                                        <h3 className="font-mono text-lg md:text-2xl font-bold uppercase tracking-tighter">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content: Description Area */}
                                <div className="pl-12 md:pl-24 pt-3 w-full text-left transition-all duration-500 opacity-60 group-hover:opacity-100 md:group-hover:translate-y-1">
                                    <p className="font-sans text-[13px] md:text-sm leading-relaxed max-w-[280px] text-zinc-600">
                                        {item.description}
                                    </p>

                                    {/* Desktop Blueprint Annotations */}
                                    <div className="hidden md:flex mt-4 items-center gap-4 font-mono text-[8px] tracking-[0.2em] text-black/20 uppercase group-hover:text-black/40 transition-colors">
                                        <span>Scale: 1:1</span>
                                        <span className="opacity-30">/</span>
                                        <span>Status: {item.log}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12"></div>
            </div>
        </section>
    );
}
