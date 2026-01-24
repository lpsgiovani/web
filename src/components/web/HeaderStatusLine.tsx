'use client';

import { useState, useEffect } from 'react';

export default function HeaderStatusLine() {
    const [phase, setPhase] = useState(0); // 0: typing part 1, 1: separator, 2: typing part 2, 3: done
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    const TARGET_TEXT_1 = "> STATUS: PRIMITIVA_V1.1";
    const TARGET_TEXT_2 = "UNIMOS ESTRATÉGIA, DESIGN E PERFORMANCE PARA CRIAR SITES IMPOSSÍVEIS DE IGNORAR.";

    useEffect(() => {
        // Start delay matching the previous CSS delay (1.2s)
        const startTimeout = setTimeout(() => {

            let charIndex1 = 0;
            const interval = setInterval(() => {
                if (charIndex1 < TARGET_TEXT_1.length) {
                    setText1(TARGET_TEXT_1.slice(0, charIndex1 + 1));
                    charIndex1++;
                } else {
                    clearInterval(interval);
                    setPhase(1); // Show separator

                    setTimeout(() => {
                        setPhase(2); // Start part 2
                        let charIndex2 = 0;
                        const interval2 = setInterval(() => {
                            if (charIndex2 < TARGET_TEXT_2.length) {
                                setText2(TARGET_TEXT_2.slice(0, charIndex2 + 1));
                                charIndex2++;
                            } else {
                                clearInterval(interval2);
                                setPhase(3);
                            }
                        }, 30); // Speed for part 2
                    }, 200); // Brief pause before part 2
                }
            }, 30); // Speed for part 1

        }, 1200);

        return () => clearTimeout(startTimeout);
    }, []);

    // Blinking cursor logic
    const [blink, setBlink] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => setBlink(b => !b), 530);
        return () => clearInterval(interval);
    }, []);

    // Helper to render cursor
    const Cursor = () => (
        <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-green-500 font-bold ml-[1px]`}>_</span>
    );

    return (
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-wide flex flex-wrap md:block items-center leading-relaxed">

            {/* Part 1: Status */}
            <span className="mr-0 md:mr-0 inline-flex items-center">
                {/* We render the text1 using dangerouslySetInnerHTML or conditional styling? 
                    Actually TARGET_TEXT_1 has mixed colors: "> STATUS:" is green, rest is zinc.
                    Let's split it simply for rendering. 
                 */}
                <span className="text-green-500 mr-2">{text1.split(':')[0] ? (text1.includes(':') ? '> STATUS:' : text1) : ''}</span>
                <span className="text-zinc-400">{text1.includes(':') ? text1.split(':')[1] : ''}</span>

                {/* Cursor for Phase 0 */}
                {phase === 0 && <Cursor />}
            </span>

            {/* Separator */}
            <span className={`mx-2 text-zinc-600 hidden md:inline transition-opacity duration-300 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>//</span>

            {/* Part 2: Argument */}
            <span className="w-full md:w-auto block md:inline mt-1 md:mt-0 text-white font-bold opacity-90">
                {text2}
                {/* Cursor for Phase 2 and 3 */}
                {phase >= 2 && <Cursor />}
            </span>
        </p>
    );
}
