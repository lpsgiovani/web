'use client';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { captureEvent, captureException } from '@/lib/analytics';

// Internal Link component
const Link = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
);

// Steps
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';
import Step8 from './steps/Step8';
import Step9 from './steps/Step9';

const formSchema = z.object({
    nome: z.string().min(3, 'Por favor, insira seu nome').trim(),
    empresa: z.string().min(2, 'Por favor, insira o nome da sua empresa').trim(),
    email: z.string().email('Por favor, insira um e-mail válido'),
    whatsapp: z.string().min(14, 'Por favor, insira um telefone válido com DDD'),
    servico: z.string().min(1, 'Por favor, selecione um serviço'),
    investimento: z.string().min(1, 'Por favor, selecione uma faixa de investimento'),
    prazo: z.string().min(1, 'Por favor, selecione um prazo'),
    descricao: z.string().min(10, 'Por favor, fale um pouco mais sobre o projeto').trim(),
    origem: z.string().min(1, 'Por favor, selecione como nos conheceu')
});

type BriefingFormData = z.infer<typeof formSchema>;

export default function BriefingForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmittingInternal, setIsSubmittingInternal] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const totalSteps = 9;

    // Supabase Sync State
    const [leadId, setLeadId] = useState<string | null>(null);

    // Track if briefing has been started for PostHog
    const hasStartedRef = useRef(false);

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors }
    } = useForm<BriefingFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: '',
            empresa: '',
            email: '',
            whatsapp: '',
            servico: '',
            investimento: '',
            prazo: '',
            descricao: '',
            origem: ''
        }
    });

    const formData = watch();

    // 1. Persistence - Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('primitiva_general_briefing');
        if (saved) {
            try {
                const { data, step, leadId: savedLeadId } = JSON.parse(saved);
                // Set form values
                Object.keys(data).forEach((key) => {
                    setValue(key as any, data[key]);
                });
                // Set step (only if not success step)
                if (step && step < 10) setCurrentStep(step);
                // Recover lead ID if exists
                if (savedLeadId) setLeadId(savedLeadId);
            } catch (e) {
                console.error("Error loading saved form:", e);
            }
        }
    }, [setValue]);

    // 2. Persistence - Save to localStorage
    useEffect(() => {
        if (currentStep < 10) {
            localStorage.setItem('primitiva_general_briefing', JSON.stringify({
                data: formData,
                step: currentStep,
                leadId: leadId
            }));
        }
    }, [formData, currentStep, leadId]);

    // 3. Database Sync (Supabase) Function
    const saveToDatabase = async (nextStepNum: number, currentData: BriefingFormData, status: 'in_progress' | 'completed' | 'abandoned' = 'in_progress') => {
        // Only start saving if we have at least one contact method
        if (!currentData.email && !currentData.whatsapp) return;

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: leadId,
                    data: currentData,
                    step: nextStepNum,
                    status: status
                })
            });

            const result = await response.json();
            if (result.success && result.lead?.id) {
                setLeadId(result.lead.id); // Save ID to update next time instead of create new
            }
        } catch (error) {
            console.error("Erro ao salvar no banco:", error);
        }
    };

    // Get current step error
    const getCurrentError = () => {
        const stepFields: Record<number, keyof BriefingFormData> = {
            1: 'nome',
            2: 'empresa',
            3: 'email',
            4: 'whatsapp',
            5: 'servico',
            6: 'investimento',
            7: 'prazo',
            8: 'descricao',
            9: 'origem'
        };
        const field = stepFields[currentStep];
        if (!field) return undefined;
        return errors[field]?.message;
    };

    const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const masked = value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d)(\d{4})$/, "$1-$2")
            .substring(0, 15);
        setValue('whatsapp', masked, { shouldValidate: true });
    };

    const nextStep = async () => {
        const stepFields: Record<number, (keyof BriefingFormData)[]> = {
            1: ['nome'],
            2: ['empresa'],
            3: ['email'],
            4: ['whatsapp'],
            5: ['servico'],
            6: ['investimento'],
            7: ['prazo'],
            8: ['descricao'],
            9: ['origem']
        };

        const isStepValid = await trigger(stepFields[currentStep]);

        if (isStepValid) {
            if (currentStep <= totalSteps) {
                // Save progress to DB before moving
                // We pass 'currentStep + 1' because that's where they are going
                const nextStepNum = currentStep + 1;
                saveToDatabase(nextStepNum, watch());

                // PostHog: Track briefing started on first step completion
                if (currentStep === 1 && !hasStartedRef.current) {
                    hasStartedRef.current = true;
                    captureEvent('briefing_started', {
                        form_type: 'general',
                        step: 1
                    });
                }

                // PostHog: Track step completion
                captureEvent('briefing_step_completed', {
                    form_type: 'general',
                    step: currentStep,
                    step_field: stepFields[currentStep]?.[0] || 'unknown'
                });

                // Enable transition protection to prevent accidental clicks
                setIsTransitioning(true);
                setCurrentStep(prev => prev + 1);

                // Disable protection after animation completes
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 350);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const selectOption = (name: keyof BriefingFormData, value: string) => {
        setValue(name, value, { shouldValidate: true });
        if (currentStep < totalSteps) {
            setTimeout(() => nextStep(), 500);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            const activeEl = document.activeElement as HTMLElement | null;
            if (activeEl?.tagName === 'TEXTAREA') return;

            e.preventDefault();
            if (currentStep < totalSteps) {
                nextStep();
            } else if (currentStep === totalSteps) {
                handleSubmit(onSubmit)();
            }
        }
    };

    const onSubmit = async (data: BriefingFormData) => {
        setIsSubmittingInternal(true);

        try {
            // 1. Send final email notification
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'briefing',
                    data: data
                })
            });

            // 2. Mark lead as completed in DB
            await saveToDatabase(10, data, 'completed');

            if (response.ok) {
                setCurrentStep(10);
                localStorage.removeItem('primitiva_general_briefing');

                // PostHog: Track successful briefing submission
                captureEvent('briefing_submitted', {
                    form_type: 'general',
                    servico: data.servico,
                    investimento: data.investimento,
                    prazo: data.prazo,
                    origem: data.origem
                });

                try {
                    // GTM Tracking
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({
                        'event': 'form_submit_success'
                    });
                } catch (e) {
                    console.error("GTM Error:", e);
                }
            } else {
                alert("Ocorreu um erro ao enviar. Tente novamente.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            // PostHog: Capture submission error
            captureException(error instanceof Error ? error : new Error(String(error)));
            alert("Ocorreu um erro de conexão.");
        } finally {
            setIsSubmittingInternal(false);
        }
    };

    // Auto-focus logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
            if (currentStepEl) {
                const input = currentStepEl.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
                if (input) input.focus();
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [currentStep]);

    const currentError = getCurrentError();

    return (
        <div className="briefing-wrapper font-display bg-[#0A0A0A] text-white h-dvh overflow-hidden flex flex-col selection:bg-white selection:text-black" onKeyDown={handleKeyDown}>

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
                <div
                    className="h-full bg-white transition-all duration-700 ease-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
            </div>

            {/* Header */}
            <div className="fixed top-8 left-8 z-50 pointer-events-none mix-blend-difference">
                <img src="/assets/primitiva/primitiva_logo.svg" alt="Primitiva" className="h-5 w-auto opacity-50" />
            </div>
            <div className="fixed top-8 right-8 z-50">
                <Link href="/" className="text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 group">
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> <span className="hidden md:inline">Cancelar</span>
                </Link>
            </div>

            {/* Top Gradient Overlay - prevents content from visually conflicting with header */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-[#0A0A0A] z-40 pointer-events-none" />
            <div className="fixed top-20 left-0 right-0 h-8 bg-gradient-to-b from-[#0A0A0A] to-transparent z-40 pointer-events-none" />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit, (errors) => {
                const stepFields: Record<number, keyof BriefingFormData> = {
                    1: 'nome',
                    2: 'empresa',
                    3: 'email',
                    4: 'whatsapp',
                    5: 'servico',
                    6: 'investimento',
                    7: 'prazo',
                    8: 'descricao',
                    9: 'origem'
                };

                // Find the first step with an error
                const firstErrorStep = Object.keys(stepFields).find(step => {
                    const field = stepFields[Number(step)];
                    return field && errors[field];
                });

                if (firstErrorStep) {
                    setCurrentStep(Number(firstErrorStep));
                }
            })} className="flex-1 flex flex-col px-8 md:px-32 pb-8 md:pb-16 pt-24 w-full max-w-4xl mx-auto overflow-y-auto">

                {currentStep === 1 && <Step1 register={register} onNext={nextStep} error={currentError} />}
                {currentStep === 2 && <Step2 register={register} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 3 && <Step3 register={register} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 4 && <Step4 register={register} onNext={nextStep} onBack={prevStep} handleWhatsAppChange={handleWhatsAppChange} error={currentError} />}
                {currentStep === 5 && <Step5 selectedValue={formData.servico} onSelect={(v) => selectOption('servico', v)} onNext={nextStep} onBack={prevStep} error={currentError} isTransitioning={isTransitioning} />}
                {currentStep === 6 && <Step6 selectedValue={formData.investimento} onSelect={(v) => selectOption('investimento', v)} onNext={nextStep} onBack={prevStep} error={currentError} isTransitioning={isTransitioning} />}
                {currentStep === 7 && <Step7 selectedValue={formData.prazo} onSelect={(v) => selectOption('prazo', v)} onNext={nextStep} onBack={prevStep} error={currentError} isTransitioning={isTransitioning} />}
                {currentStep === 8 && <Step8 register={register} onNext={nextStep} onBack={prevStep} error={currentError} />}
                {currentStep === 9 && <Step9 selectedValue={formData.origem} onSelect={(v) => selectOption('origem', v)} onBack={prevStep} isSubmitting={isSubmittingInternal} error={currentError} isTransitioning={isTransitioning} />}

                {/* Step Final: Sucesso */}
                {currentStep === 10 && (
                    <div className="flex flex-col items-center justify-center w-full max-w-4xl text-center my-auto">
                        <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Obrigado!</h2>
                        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">Recebemos seus dados. <br></br>Em breve entraremos em contato para darmos vida ao seu projeto.</p>
                        <Link href="/" className="inline-block border border-white/20 px-8 py-4 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all">Página Inicial</Link>
                    </div>
                )}
            </form>
        </div>
    );
}
