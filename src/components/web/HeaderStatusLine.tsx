'use client';

import { useState, useEffect } from 'react';

export default function HeaderStatusLine() {
    const [phase, setPhase] = useState(0); // 0: typing part 1, 1: separator, 2: typing part 2, 3: done
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    const TARGET_TEXT_1 = "> STATUS: MODO_PRIMITIVO_ATIVADO";
    const TARGET_TEXT_2 = "UNIMOS ESTRATÉGIA, DESIGN E PERFORMANCE PARA CRIAR SITES IMPOSSÍVEIS DE IGNORAR.";

    // ... (rest of logic unchanged)

    // Helper to render cursor
    const Cursor = () => (
        <span className={`inline-block w-[0.5em] h-[1.2em] bg-green-500 ml-1 align-middle ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
    );
    // Note: Using a block cursor is more authentic to terminals and scales better.

    return (
        <div className="w-full flex flex-col items-start leading-tight font-mono uppercase tracking-wide">

            {/* Part 1: Status (Responsive Size) */}
            <div className="w-full text-[3vw] md:text-sm text-green-500 mb-1">
                <span>{text1.split(':')[0] ? (text1.includes(':') ? '> STATUS:' : text1) : ''}</span>
                <span className="text-zinc-400 ml-2">{text1.includes(':') ? text1.split(':')[1] : ''}</span>
                {phase === 0 && <Cursor />}
            </div>

            {/* Part 2: Argument (Responsive Size for 1-Line fit on desktop, 2 on mobile if needed, but 'fitting' is the goal) */}
            <div className="w-full text-[4vw] md:text-xl font-bold text-white opacity-90">
                <span>{text2}</span>
                {phase >= 2 && <Cursor />}
            </div>
        </div>
    );
}
