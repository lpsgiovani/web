'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { captureEvent } from '@/lib/analytics';

interface FAQItem {
    q: string;
    a: string;
}

const faqs: FAQItem[] = [
    { q: "Vocês criam apenas o logotipo?", a: "Não. Acreditamos que um símbolo isolado não constrói uma marca forte. Trabalhamos com Sistemas de Identidade Visual completos, que incluem tipografia, paleta de cores, padrões gráficos e diretrizes de uso. Entregamos um ecossistema visual, não apenas um desenho." },
    { q: "Qual é o prazo médio de um projeto?", a: "Um projeto completo de Identidade Visual leva em média de 4 a 6 semanas. Projetos de Web e Apps variam de acordo com a complexidade. Todo o cronograma é apresentado e validado com você antes do início dos trabalhos." },
    { q: "Como vocês desenvolvem os sites? Usam templates prontos?", a: "Priorizamos o desenvolvimento sob medida (High-end Development). Criamos sites performáticos e otimizados para SEO que carregam instantaneamente, fugindo de templates genéricos e lentos. Usamos a tecnologia que melhor se adapta ao seu negócio, não o contrário." },
    { q: "Quanto custa um projeto?", a: "Cada marca tem um desafio único. Um rebranding de uma franquia exige um esforço diferente de uma startup em estágio inicial. Por isso, fazemos uma reunião de diagnóstico para entender sua necessidade real e montar uma proposta personalizada que faça sentido para o seu momento." },
    { q: "Como funciona o pagamento?", a: "Trabalhamos geralmente com 50% de entrada para reserva de agenda e início do projeto, e os 50% restantes na entrega final dos arquivos." }
];

export default function FAQ() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.reveal-up');
            elements.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    const toggleAccordion = (index: number) => {
        const isOpening = activeAccordion !== index;
        setActiveAccordion(activeAccordion === index ? null : index);

        // PostHog: Track FAQ expanded (only when opening)
        if (isOpening && faqs[index]) {
            captureEvent('faq_expanded', {
                faq_question: faqs[index].q,
                faq_index: index
            });
        }
    };

    return (
        <section className="cv-auto py-20 px-6 md:py-32 bg-background-light">
            <div className="max-w-xl md:max-w-2xl mx-auto">
                <h3 className="text-xl font-bold uppercase mb-8 border-b border-black pb-2 reveal-up">Dúvidas Frequentes</h3>
                <div ref={containerRef} className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-black/20 dark:border-white/20 pb-4 reveal-up delay-100">
                            <button
                                type="button"
                                onClick={() => toggleAccordion(idx)}
                                className="accordion-trigger flex items-center justify-between w-full text-left group cursor-pointer outline-none py-2"
                            >
                                <span className="text-lg md:text-xl font-bold">{faq.q}</span>
                                <ChevronDown className={`transition-transform duration-300 icon-toggle ${activeAccordion === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`accordion-content ${activeAccordion === idx ? 'block' : 'hidden'} mt-4 text-base leading-relaxed opacity-80 font-serif`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
