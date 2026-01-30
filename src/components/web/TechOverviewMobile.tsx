'use client';

import React, { useEffect, useRef, useState } from 'react';

const TECH_PILLARS = [
    {
        id: '01',
        title: "Imersão",
        description: "Antes de desenhar, nós pensamos. Fazemos uma imersão no seu modelo de negócio para extrair o diferencial que você ainda não sabe como mostrar ao mundo. Mapeamos comportamentos, analisamos dados e definimos a estratégia que vai sustentar todas as decisões do projeto.",
        label: "ghost-phase-01",
        file: "ghost-label-extraction",
        tag: "[ MAPEANDO_OPORTUNIDADES ]",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    },
    {
        id: '02',
        title: "Criação",
        description: "Construímos um ecossistema visual proprietário onde o design e a engenharia de software são indissociáveis. O resultado é um sistema fluido, impossível de ignorar e tecnicamente imbatível.",
        label: "ghost-phase-02",
        file: "ghost-label-assembly",
        tag: "[ DESENVOLVENDO_EXPERIENCIA ]",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    },
    {
        id: '03',
        title: "Monitoramento",
        description: "Implementamos uma camada de inteligência de dados para rastrear cada movimento do usuário. Transformamos o seu site em um organismo vivo que escala, converte e otimiza o seu ROI em tempo real.",
        label: "ghost-phase-03",
        file: "ghost-label-growth",
        tag: "[ MONITORANDO_MÉTRICAS ]",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    }
];

export default function TechOverviewMobile() {
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

                    const totalDistance = rect.height - windowHeight;
                    const currentPos = -rect.top;

                    const progress = Math.min(Math.max(currentPos / totalDistance, 0), 1);
                    setScrollProgress(progress);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDistance = rect.height - windowHeight;
            const currentPos = -rect.top;
            setScrollProgress(Math.min(Math.max(currentPos / totalDistance, 0), 1));
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // We use a custom mapping to create "locks" (pauses) at each card position.
    // This function maps linear scroll progress to a non-linear translateX.
    const getLockedTranslateX = (p: number) => {
        // Steps: 
        // 0.00 - 0.15: Card 1 Lock (0%)
        // 0.15 - 0.42: Transition 1 -> 2
        // 0.42 - 0.58: Card 2 Lock (33.33%)
        // 0.58 - 0.85: Transition 2 -> 3
        // 0.85 - 1.00: Card 3 Lock (66.66%)

        if (p <= 0.15) return 0;
        if (p <= 0.42) {
            const t = (p - 0.15) / (0.42 - 0.15);
            const easedT = t * t * (3 - 2 * t); // Smoothstep easing
            return easedT * 33.333;
        }
        if (p <= 0.58) return 33.333;
        if (p <= 0.85) {
            const t = (p - 0.58) / (0.85 - 0.58);
            const easedT = t * t * (3 - 2 * t);
            return 33.333 + (easedT * 33.333);
        }
        return 66.666;
    };

    const translateX = getLockedTranslateX(scrollProgress);

    return (
        <div ref={containerRef} className="relative h-[350vh] w-full bg-zinc-50 overflow-visible">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-zinc-50 border-t border-zinc-200">

                <div className="absolute top-24 left-0 w-full text-center px-6 z-20 pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-black/20 block mb-4">/ NOSSO_PROCESSO</span>
                    <h3 className="text-4xl font-serif text-black leading-[1.1] tracking-tighter">
                        Como nós <br md:block></br><span className="italic">desenvolvemos.</span>
                    </h3>
                </div>

                <div
                    className="flex flex-nowrap w-[300%] items-center mt-0 will-change-transform"
                    style={{ transform: `translateX(-${translateX}%)` }}
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
                                            <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold">{item.tag}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
