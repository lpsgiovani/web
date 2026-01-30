'use client';

import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { captureEvent } from '@/lib/analytics';

export default function ContactOptions() {
    const handleWhatsAppClick = () => {
        captureEvent('whatsapp_clicked', {
            location: 'contact_page',
            phone_number: '5532999508150'
        });
    };

    return (
        <div className="md:col-span-8 flex flex-col reveal-up delay-200 mb-16 md:mb-0">
            <p className="text-white/60 font-serif text-lg mb-12 max-w-md md:hidden">
                Tem um projeto audacioso em mente? <br />Escolha a melhor forma de iniciar nossa conexão.
            </p>

            <div className="flex flex-col border-t border-white/20">
                <a
                    href="https://wa.me/5532999508150"
                    target="_blank"
                    onClick={handleWhatsAppClick}
                    className="group border-b border-white/20 py-8 md:py-12 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            01 / CANAL_DIRETO
                        </span>
                        <span className="text-3xl md:text-5xl font-display font-bold uppercase group-hover:text-white/80 transition-colors">
                            WhatsApp
                        </span>
                    </div>
                    <ArrowUpRight className="w-9 h-9 md:w-12 md:h-12 text-white/50 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
                </a>

                <a
                    href="/briefing/"
                    className="group border-b border-white/20 py-8 md:py-12 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            02 / BRIEFING_DETALHADO
                        </span>
                        <span className="text-3xl md:text-5xl font-display font-bold uppercase group-hover:text-white/80 transition-colors">
                            Formulário
                        </span>
                    </div>
                    <ArrowRight className="w-9 h-9 md:w-12 md:h-12 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                </a>
            </div>
        </div>
    );
}
