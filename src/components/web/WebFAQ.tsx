'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { captureEvent } from '@/lib/analytics';

interface FAQItem {
    q: string;
    a: string;
}

const faqs: FAQItem[] = [
    { q: "Vocês usam WordPress?", a: "Evitamos WordPress para projetos de alta performance. Utilizamos tecnologias modernas como Astro e Next.js, que garantem segurança superior, velocidade extrema e zero manutenção constante de plugins." },
    { q: "O site é otimizado para SEO?", a: "Sim, o SEO é nativo em nossa metodologia. Entregamos o site com estrutura semântica correta, meta-tags dinâmicas, sitemap automático e otimização de performance, garantindo que o Google 'leia' e priorize seu site." },
    { q: "Consigo editar o conteúdo depois?", a: "Com certeza. Caso opte por um Sistema de Gerenciamento de Conteúdo (CMS), integramos seu site a um CMS headless. Você terá um painel intuitivo para alterar textos, trocar imagens e criar novas páginas de blog ou produtos sem precisar tocar em uma linha de código." },
    { q: "Quanto tempo demora para ficar pronto?", a: "Sites institucionais e Landing Pages levam em média de 2 a 4 semanas. E-commerces e projetos complexos podem variar de 6 a 8 semanas." },
    { q: "O site vai funcionar em celulares?", a: "Desenvolvemos com a metodologia 'Mobile First'. Seu site será perfeitamente responsivo, adaptando-se fluidamente a qualquer tamanho de tela, garantindo a melhor experiência para usuários móveis." }
];

export default function WebFAQ() {
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

        // PostHog: Track WebFAQ expanded (only when opening)
        if (isOpening && faqs[index]) {
            captureEvent('faq_expanded', {
                faq_question: faqs[index].q,
                faq_index: index,
                source: 'web_lp'
            });
        }
    };

    return (
        <section className="cv-auto py-20 px-6 md:py-32 bg-background-light text-primary">
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
