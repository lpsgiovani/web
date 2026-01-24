'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "A velocidade do site mudou completamente nossa campanha de Ads. O custo por conversão caiu 40% na primeira semana.",
        author: "Ricardo M.",
        role: "E-commerce Manager"
    },
    {
        quote: "Tecnicamente impecável. O código é limpo, escalável e o SEO técnico nos colocou na primeira página em 3 meses.",
        author: "Sofia L.",
        role: "Diretora de Marketing"
    },
    {
        quote: "Finalmente um parceiro que entende que design e performance precisam andar juntos. O painel administrativo é super fácil de usar.",
        author: "André V.",
        role: "Fundador Startup"
    }
];

export default function WebTestimonials() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 md:py-24 px-6 bg-black text-white border-y border-white/20 reveal-up">
            <div className="max-w-xl md:max-w-3xl mx-auto text-center relative min-h-[350px] md:min-h-[300px] flex items-center justify-center">
                {testimonials.map((test, idx) => (
                    <div
                        key={idx}
                        className={`testimonial-slide absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${currentTestimonial === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <blockquote className="font-serif text-3xl md:text-5xl italic leading-tight mb-8">
                            "{test.quote}"
                        </blockquote>
                        <cite className="not-italic flex flex-col items-center gap-1">
                            <span className="font-bold uppercase tracking-widest text-sm">{test.author}</span>
                            <span className="text-xs font-mono text-gray-400">{test.role}</span>
                        </cite>
                    </div>
                ))}
            </div>
        </section>
    );
}
