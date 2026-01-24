'use client';

import React, { useEffect, useRef, useState } from 'react';

const TECH_PILLARS = [
    {
        id: '01',
        title: "Imersão",
        description: "Extração de dados e análise de mercado para modelar o DNA da marca. Onde a estratégia encontra a viabilidade técnica.",
        label: "ghost-phase-01",
        file: "ghost-label-extraction",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    },
    {
        id: '02',
        title: "Criação",
        description: "Desenvolvimento da identidade e arquitetura de software. Tradução do DNA em sistemas visuais e código de alta performance.",
        label: "ghost-phase-02",
        file: "ghost-label-assembly",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    },
    {
        id: '03',
        title: "Expansão",
        description: "Lançamento assistido e monitoramento de performance. Otimização contínua através de GTM e Analytics para garantir crescimento.",
        label: "ghost-phase-03",
        file: "ghost-label-growth",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    }
];

export default function TechOverviewMobile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const totalDistance = rect.height - windowHeight;
            const currentPos = -rect.top;

            const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const translateX = scrollProgress * 66.66;

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full bg-zinc-50 overflow-visible">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-zinc-50 border-t border-zinc-200">

                <div className="absolute top-24 left-0 w-full text-center px-6 z-20 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 mb-2 block select-none" aria-hidden="true">/ NOSSO_PROCESSO</span>
                    <h3 className="text-3xl font-serif text-black leading-tight italic">
                        Ritual de desenvolvimento.
                    </h3>
                </div>

                <div
                    className="flex flex-nowrap w-[300%] items-center transition-transform duration-75 ease-out"
                    style={{ transform: `translateX(-${translateX}%)`, willChange: 'transform' }}
                >
                    {TECH_PILLARS.map((item) => (
                        <div key={item.id} className="w-screen flex justify-center items-center shrink-0 px-6">
                            <div className="w-full max-w-[340px]">
                                <div className="relative flex flex-col aspect-square w-full border-2 border-black bg-white opacity-100 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
                                    <div className="h-8 border-b border-black flex items-center px-4 gap-1.5 bg-zinc-100">
                                        <div className="flex gap-1.5" role="none">
                                            {item.colors.map(c => <div key={c} className={`w-2.5 h-2.5 rounded-full ${c} border border-black/10`}></div>)}
                                        </div>
                                        <span className={`${item.file} ml-auto font-mono text-[9px] uppercase tracking-wider text-black/20`} aria-hidden="true"></span>
                                    </div>
                                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-mono text-xl font-bold uppercase mb-4 leading-none">{item.title}</h4>
                                            <p className="text-sm leading-relaxed opacity-70 font-sans">{item.description}</p>
                                        </div>
                                        <div className="pt-4 border-t border-black/10 flex flex-col gap-2">
                                            <div className={`${item.label} font-mono text-[9px] uppercase tracking-widest leading-none text-black/20`} aria-hidden="true"></div>
                                            <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold">[ BUSINESS_READY ]</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .ghost-label-extraction::after { content: 'DATA_EXTRACTION.LOG'; }
                .ghost-label-assembly::after { content: 'SYSTEM_ASSEMBLY.EXE'; }
                .ghost-label-growth::after { content: 'GROWTH_DEPLOY.SYS'; }
                
                .ghost-phase-01::after { content: '[ PHASE_01 ]'; }
                .ghost-phase-02::after { content: '[ PHASE_02 ]'; }
                .ghost-phase-03::after { content: '[ PHASE_03 ]'; }
            `}</style>
        </div>
    );
}
