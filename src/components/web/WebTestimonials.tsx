'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Superou minhas expectativas, e olha que eu já esperava muito. Fiquei um bom tempo navegando, descendo a página, apaixonada pelo resultado final. Eu amei demais!",
        author: "Victoria Boccanera",
        role: "@vickysaudavel"
    },
    {
        quote: "Eu ameiii. O layout transmitiu a essência do Pé de Café de uma forma que eu nem imaginava ser possível. Além de bonito, todo o sistema fluiu muito bem.",
        author: "Mirella Motta",
        role: "@concursopedecafe"
    },
    {
        quote: "Conseguiu me tirar um sorriso imenso e o silêncio de satisfação. Estou apaixonada, para dizer o mínimo.",
        author: "Paola Gatti",
        role: "@paolagatti.tattoo"
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
                        <blockquote className="font-serif text-2xl md:text-5xl italic leading-tight mb-8 text-balance px-4 md:px-0">
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
