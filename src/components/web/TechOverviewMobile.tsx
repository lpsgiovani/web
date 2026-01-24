'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TECH_PILLARS = [
    {
        id: '01',
        title: "Imersão",
        description: "Extração de dados e análise de mercado para modelar o DNA da marca. Onde a estratégia encontra a viabilidade técnica.",
        label: "[ FASE_01 ]",
        file: "ESTRATEGIA.LOG",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    },
    {
        id: '02',
        title: "Criação",
        description: "Desenvolvimento da identidade e arquitetura de software. Tradução do DNA em sistemas visuais e código de alta performance.",
        label: "[ FASE_02 ]",
        file: "DESIGN.EXE",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    },
    {
        id: '03',
        title: "Expansão",
        description: "Lançamento assistido e monitoramento de performance. Otimização contínua através de GTM e Analytics para garantir crescimento.",
        label: "[ FASE_03 ]",
        file: "DEPLOY.EXE",
        colors: ["bg-red-500", "bg-yellow-500", "bg-green-500"]
    }
];

export default function TechOverviewMobile() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Pista de Scroll de 250vh
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Mapeamento 1:1 Direto
    // [0, 1] no scroll -> 3 cards completos
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

    return (
        // Pai relativo define a duração do scroll
        <div ref={sectionRef} className="relative h-[200vh] w-full bg-zinc-50">

            {/* Sticky Wrapper DEVE ser h-screen e top-0 para cobrir 100% da viewport */}
            {/* Isso garante que a seção "congele" visualmente no tamanho exato da tela */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-zinc-50 border-t border-zinc-200">

                {/* Header Overlay */}
                <div className="absolute top-24 left-0 w-full text-center px-6 z-20 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 mb-2 block">/ NOSSO_PROCESSO</span>
                    <h3 className="text-3xl font-serif text-black leading-tight italic">
                        Ritual de desenvolvimento.
                    </h3>
                </div>

                {/* Cards Track */}
                <motion.div
                    style={{ x, willChange: "transform" }}
                    className="flex flex-nowrap w-[300%] items-center"
                >
                    {TECH_PILLARS.map((item, idx) => (
                        <div key={item.id} className="w-screen flex justify-center items-center shrink-0 px-6">
                            <div className="w-full max-w-[340px]">
                                <TechCard item={item} index={idx} progress={scrollYProgress} />
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
}

function TechCard({ item, index, progress }: { item: typeof TECH_PILLARS[0], index: number, progress: any }) {
    // 0.33 e 0.66 breakpoints
    let isActive;
    if (index === 0) {
        isActive = useTransform(progress, [0, 0.33], [1, 0]);
    } else if (index === 1) {
        isActive = useTransform(progress, [0.33, 0.34, 0.66, 0.67], [0, 1, 1, 0]);
    } else {
        isActive = useTransform(progress, [0.66, 1], [0, 1]);
    }

    // Binary switch style
    // const bgColor = useTransform(isActive, (v) => v > 0.5 ? "#000000" : "#ffffff");
    // const textColor = useTransform(isActive, (v) => v > 0.5 ? "#ffffff" : "#000000");
    // const borderColor = useTransform(isActive, (v) => v > 0.5 ? "#ffffff" : "#000000");
    // const headerBg = useTransform(isActive, (v) => v > 0.5 ? "#18181b" : "#f4f4f5");

    return (
        <motion.div
            style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#000000" }}
            className="relative flex flex-col aspect-square w-full border-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors duration-200 rounded-2xl overflow-hidden"
        >
            {/* Window Header */}
            <motion.div
                style={{ backgroundColor: "#f4f4f5", borderColor: "#000000" }}
                className="h-8 border-b flex items-center px-4 gap-1.5 transition-colors duration-200"
            >
                <div className="flex gap-1.5">
                    {item.colors.map(c => <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`}></div>)}
                </div>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-wider opacity-30">{item.file}</span>
            </motion.div>

            {/* Body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-mono text-xl font-bold uppercase mb-4 leading-none transition-none">
                        {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed opacity-70 font-sans transition-none">
                        {item.description}
                    </p>
                </div>

                <div className="pt-4 border-t border-current opacity-20 flex flex-col gap-2">
                    <div className="font-mono text-[9px] uppercase tracking-widest leading-none">
                        {item.label}
                    </div>
                    <div className="relative">
                        <motion.div
                            style={{ opacity: isActive }}
                            className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap"
                        >
                            [ BUSINESS_READY ]
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
