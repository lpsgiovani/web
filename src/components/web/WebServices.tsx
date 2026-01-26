'use client';

import React, { useEffect, useRef, useState } from 'react';

const SERVICES = [
    {
        id: 'SRV_01',
        title: "Estratégia",
        description: "A Primitiva não é apenas um time de desenvolvedores ou designers; somos, antes de tudo, uma agência de estratégia de marca. Cada entrega aqui é precedida por pesquisa profunda e método, garantindo que sua interface não seja apenas bonita, mas uma ferramenta de negócios intencional.",
        log: "STRATEGY.LOG"
    },
    {
        id: 'SRV_02',
        title: "Design",
        description: "Nossa expertise em UX/UI designer é fundida à estratégia de branding. Desenvolvemos sistemas visuais de alta fidelidade que transformam a essência do seu negócio em uma presença digital impossível de ignorar e tecnicamente imbatível.",
        log: "VISUAL_IDENTITY.EXE"
    },
    {
        id: 'SRV_03',
        title: "Performance",
        description: "Performance não é um detalhe técnico, é lógica de negócios. Utilizamos tecnologias como Astro e arquiteturas estáticas para garantir que seu site tenha Nota 99+, eliminando a rejeição e convertendo milissegundos em lucro.",
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
        <section className="bg-black text-white pt-24 pb-16 md:pt-26 md:pb-32 px-6 border-b border-white/10 relative overflow-hidden selection:bg-white selection:text-black">
            {/* Background Circuit Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="mb-16 md:mb-20 text-center reveal-up">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30 block mb-4">/ NOSSA_EXPERTISE</span>
                    <h2 className="text-4xl md:text-7xl font-serif italic tracking-tight">
                        Sistemas que <span className="text-white/40"><br></br>convertem.</span>
                    </h2>
                </div>

                {/* Main Circuit Container */}
                <div ref={containerRef} className="relative">

                    {/* DESKTOP: Horizontal Circuit Line */}
                    <div className="hidden md:block absolute top-[100px] left-[102px] right-[calc(33.33%-102px)] h-[1px] bg-white/10 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[1px] animate-circuit-flow" />
                    </div>

                    {/* MOBILE: Vertical Timeline Line (Base) */}
                    <div className="md:hidden absolute left-[21px] top-[7px] bottom-[7px] w-[1px] bg-white/5" />

                    {/* MOBILE: Vertical Timeline Line (Scroll Progress) */}
                    <div
                        style={{ height: `${scrollProgress * 100}%` }}
                        className="md:hidden absolute left-[21px] top-[7px] w-[1px] bg-gradient-to-b from-transparent via-white to-transparent opacity-80 z-10 transition-all duration-300 ease-out"
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
                                        className="w-3 h-3 border border-zinc-600 bg-black group-hover:bg-white group-hover:border-white transition-all duration-300"
                                        style={{ animationDelay: `${idx * 1.5}s` }}
                                    />
                                </div>

                                {/* Content: Title Area */}
                                <div className="pl-12 md:pl-24 md:h-[100px] flex flex-col justify-end pb-3 w-full text-left transition-all duration-500 md:group-hover:-translate-y-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-mono text-[10px] text-zinc-500 tracking-widest">[0{idx + 1}]</span>
                                        <h3 className="font-mono text-lg md:text-2xl font-bold uppercase tracking-tighter">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content: Description Area */}
                                <div className="pl-12 md:pl-24 pt-3 w-full text-left transition-all duration-500 opacity-60 group-hover:opacity-100 md:group-hover:translate-y-1">
                                    <p className="font-sans text-[13px] md:text-sm leading-relaxed max-w-[280px]">
                                        {item.description}
                                    </p>

                                    {/* Desktop Blueprint Annotations */}
                                    <div className="hidden md:flex mt-4 items-center gap-4 font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase group-hover:text-white/40 transition-colors">
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
