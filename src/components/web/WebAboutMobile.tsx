'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TEAM = [
    {
        id: 'giovani',
        name: "Giovani Lopes",
        role: "// ESTRATÉGIA & DESIGN",
        specialty1: "Especialista em ",
        specialtyStrong1: "Branding",
        specialty2: " e ",
        specialtyStrong2: "UX/UI Design",
        bio: "Giovani garante que a estética nunca seja vazia. Seu trabalho é fundido à estratégia de negócio, assegurando propósito comercial em cada pixel.",
        file: "giovani.tsx",
        img: "/assets/primitiva/giovani.jpg",
        borderColor: "border-zinc-800",
        bgColor: "bg-zinc-950/80",
        hoverBorder: "hover:border-zinc-700"
    },
    {
        id: 'tempone',
        name: "Gustavo Tempone",
        role: "// ENGENHARIA",
        specialty1: "Especialista em ",
        specialtyStrong1: "Arquitetura de Software",
        specialty2: ".",
        bio: "Gustavo transforma a estratégia em sistemas ultra-velozes, garantindo performance e escalabilidade de ponta a ponta.",
        file: "gustavo.tsx",
        img: "/assets/primitiva/tempone.png",
        borderColor: "border-zinc-800",
        bgColor: "bg-zinc-900/50",
        hoverBorder: "hover:border-zinc-700"
    }
];

export default function WebAboutMobile() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll track of 150vh
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // 2 items: 0% -> -50% translation
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section ref={sectionRef} id="about-mobile" className="relative h-[150vh] w-full bg-zinc-950">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">

                {/* Cards Track */}
                <motion.div
                    style={{ x, willChange: "transform" }}
                    className="flex flex-nowrap w-[200%] items-center"
                >
                    {TEAM.map((member, idx) => (
                        <div key={member.id} className="w-[50%] flex justify-center items-center shrink-0 px-6">
                            {/* Card matches WebAbout.astro visuals exactly */}
                            <div className={`flex flex-col w-full max-w-[300px] border-[1.5px] ${member.borderColor} ${member.bgColor} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${member.hoverBorder} duration-300 group h-full rounded-2xl overflow-hidden`}>
                                <div className={`h-10 border-b-[1.5px] ${member.borderColor} flex items-center px-4 gap-2 bg-zinc-900`}>
                                    <div className="flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <div className="w-2.5 h-2.5 rounded-full border border-black/20 bg-[#ff5f57]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full border border-black/20 bg-[#febc2e]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full border border-black/20 bg-[#28c840]"></div>
                                    </div>
                                    <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-zinc-600">
                                        {member.file}
                                    </span>
                                </div>
                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-16 h-16 shrink-0 border-[1.5px] ${member.borderColor} p-1 bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:border-zinc-700 transition-all overflow-hidden`}>
                                            <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter leading-none font-display mb-2 text-white">{member.name}</h3>
                                            <p className="font-mono text-[10px] text-zinc-500 tracking-tight">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 flex-grow">
                                        <p className="text-lg font-serif leading-relaxed text-zinc-300">
                                            {member.specialty1}
                                            <strong className="text-white">{member.specialtyStrong1}</strong>
                                            {member.specialty2}
                                            {member.specialtyStrong2 && <strong className="text-white">{member.specialtyStrong2}</strong>}
                                        </p>
                                        <p className="text-zinc-500 text-sm leading-relaxed font-sans">{member.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Pagination Indicators - Synced with scroll */}
                <div className="flex justify-center items-center gap-3 mt-12 w-full">
                    <Dot index={0} progress={scrollYProgress} />
                    <Dot index={1} progress={scrollYProgress} />
                </div>
            </div>
        </section>
    );
}

function Dot({ index, progress }: { index: number, progress: any }) {
    const isActive = useTransform(
        progress,
        index === 0 ? [0, 0.5] : [0.5, 1],
        index === 0 ? [1, 0] : [0, 1]
    );

    // Transform boolean active state to color
    const bg = useTransform(isActive, v => v > 0.5 ? "#ffffff" : "transparent");

    return (
        <motion.div
            style={{ backgroundColor: bg }}
            className="w-2 h-2 border border-white transition-colors duration-300"
        />
    );
}
