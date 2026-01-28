'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { captureEvent } from '@/lib/analytics';

interface FAQItem {
    q: string;
    a: string;
}

const faqs: FAQItem[] = [
    { q: "Vocês usam WordPress?", a: "Não utilizamos WordPress ou construtores de arrastar e soltar. Trabalhamos com código proprietário e arquiteturas modernas (como Astro e Next.js), garantindo que seu projeto seja exclusivo, imune às vulnerabilidades comuns de plugins e muito mais veloz." },
    { q: "O site é otimizado para SEO?", a: "Sim, o SEO é nativo em nossa metodologia. Entregamos o site com estrutura semântica correta, meta-tags dinâmicas, sitemap automático e otimização de performance, garantindo que o Google 'leia' e priorize seu site." },
    { q: "Como funciona a manutenção do site após a entrega?", a: "Como utilizamos arquiteturas estáticas e código limpo, seu site não precisará de atualizações constantes de segurança ou manutenção de plugins. Se houver necessidade de gestão de conteúdo, entregamos um painel administrativo intuitivo (CMS Headless) para que você tenha autonomia total sobre os dados." },
    { q: "Quanto tempo demora para ficar pronto?", a: "O prazo de entrega é calculado sob medida após o diagnóstico inicial, pois depende diretamente da complexidade da engenharia e da profundidade estratégica necessária. Projetos focados em conversão rápida, como Landing Pages, costumam ser entregues entre 2 a 3 semanas. Já ecossistemas mais robustos, como dashboards e softwares personalizados, possuem cronogramas modulares definidos por etapas de entrega, garantindo que o desenvolvimento acompanhe o ritmo e a necessidade de escala do seu negócio." },
    { q: "Vocês fazem apenas o site ou também a identidade visual?", a: "Somos um estúdio focado em branding e design. Nosso diferencial é justamente a união dessas frentes. Podemos construir sua marca do zero, desde o logotipo e posicionamento até a engenharia final do software, garantindo que a sua essência visual e a performance técnica caminhem juntas em um único ecossistema." },
    { q: "O site será meu ou ficarei dependente da Primitiva?", a: "Todo o código proprietário desenvolvido e os ativos de design são de sua total propriedade após a entrega. Além disso, utilizamos tecnologias de mercado que permitem que qualquer desenvolvedor sênior possa dar continuidade ao projeto caso você decida escalar sua equipe interna no futuro." }
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
