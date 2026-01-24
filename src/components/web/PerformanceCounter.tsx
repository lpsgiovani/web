'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function PerformanceCounter({ label, delay = 0 }: { label: string, delay?: number }) {
    const [count, setCount] = useState(0);
    const [dashOffset, setDashOffset] = useState(251); // 2 * PI * 40 (r=40 approx for dasharray 251)
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    setTimeout(() => {
                        const duration = 1500; // 1.5s
                        const startTime = performance.now();
                        const startOffset = 251;
                        const endOffset = 0; // Full circle

                        const animate = (currentTime: number) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);

                            // Ease Out Expo: 1 - pow(2, -10 * t)
                            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                            // Update number
                            setCount(Math.round(easeOutExpo * 100));

                            // Update stroke
                            const currentDash = startOffset - (easeOutExpo * (startOffset - endOffset));
                            setDashOffset(currentDash);

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        };

                        requestAnimationFrame(animate);
                    }, delay);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={containerRef} className="flex flex-col items-center gap-2 md:gap-3">
            <div className="relative w-16 h-16 md:w-28 md:h-28 flex items-center justify-center aspect-square">
                {/* Background Circle */}
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#f0fdf4" // green-50
                        strokeWidth="6"
                    />
                    {/* Animated Stroke */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#22c55e" // green-500
                        strokeWidth="6"
                        strokeDasharray="283" // 2 * PI * 45
                        strokeDashoffset={dashOffset} // calculated dynamically
                        strokeLinecap="round"
                    />
                </svg>
                {/* Counter Text */}
                <span className="relative z-10 text-xl md:text-4xl font-black text-green-600 font-sans tracking-tight">
                    {count}
                </span>
            </div>
            <span className="font-mono text-[8px] md:text-xs uppercase font-bold text-center tracking-wider opacity-60">
                {label}
            </span>
        </div>
    );
}
