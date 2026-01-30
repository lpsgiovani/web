'use client';
import React from 'react';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';

interface StepContainerProps {
    children: React.ReactNode;
    isActive: boolean;
    step: number;
}

export function StepContainer({ children, isActive, step }: StepContainerProps) {
    if (!isActive) return null;
    return (
        <div data-step={step} className="flex flex-col w-full max-w-4xl mt-auto md:my-auto step-enter">
            {children}
        </div>
    );
}

interface StepHeaderProps {
    stepNumber: string;
    title: string;
    question: string;
}

export function StepHeader({ stepNumber, title, question }: StepHeaderProps) {
    return (
        <div className="animate-reveal-up">
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-6 block">{stepNumber} — {title}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight leading-tight">{question}</h2>
        </div>
    );
}

interface OptionCardProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    isDisabled?: boolean;
}

export function OptionCard({ label, selected, onClick, isDisabled = false }: OptionCardProps) {
    const handleClick = () => {
        if (isDisabled) return;
        onClick();
    };

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer p-6 md:p-10 flex items-center justify-between border transition-all duration-700
                ${selected
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.01] text-white/60 border-white/5 hover:bg-white/[0.03] hover:border-white/10'
                }
                ${isDisabled ? 'pointer-events-none' : ''}`}
        >
            <span className="text-xs md:text-sm font-mono uppercase tracking-widest">{label}</span>
            {selected && <Check className="w-4 h-4" />}
        </div>
    );
}

// ========== INPUT WITH INLINE ARROW ==========
interface InputWithArrowProps {
    register: any;
    name: string;
    placeholder: string;
    onNext: () => void;
    autoComplete?: string;
    showArrow?: boolean;
}

export function InputWithArrow({ register, name, placeholder, onNext, autoComplete = 'off', showArrow = true }: InputWithArrowProps) {
    return (
        <div className="relative w-full group">
            <input
                {...register(name)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="input-text pr-16"
            />
            {showArrow && (
                <button
                    type="button"
                    onPointerDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-0 bottom-3 w-10 h-10 bg-white text-black flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform z-20"
                    tabIndex={-1}
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            )}
            <span className="absolute right-12 bottom-6 text-[9px] opacity-20 hidden md:inline-block uppercase tracking-widest font-mono pointer-events-none group-focus-within:opacity-40 transition-opacity">
                Aperte ENTER
            </span>
        </div>
    );
}

// ========== INPUT WITH INLINE ARROW (MASKED) ==========
interface InputWithArrowMaskedProps {
    register: any;
    name: string;
    placeholder: string;
    onNext: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export function InputWithArrowMasked({ register, name, placeholder, onNext, onChange, type = 'text' }: InputWithArrowMaskedProps) {
    return (
        <div className="relative w-full group">
            <input
                {...register(name)}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="input-text pr-16"
            />
            <button
                type="button"
                onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-0 bottom-3 w-10 h-10 bg-white text-black flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform z-20"
                tabIndex={-1}
            >
                <ArrowRight className="w-5 h-5" />
            </button>
            <span className="absolute right-12 bottom-6 text-[9px] opacity-20 hidden md:inline-block uppercase tracking-widest font-mono pointer-events-none group-focus-within:opacity-40 transition-opacity">
                Aperte ENTER
            </span>
        </div>
    );
}

// ========== TEXTAREA WITH INLINE ARROW ==========
interface TextareaWithArrowProps {
    register: any;
    name: string;
    placeholder: string;
    onNext: () => void;
    showArrow?: boolean;
}

export function TextareaWithArrow({ register, name, placeholder, onNext, showArrow = true }: TextareaWithArrowProps) {
    const { ref, ...rest } = register(name);
    return (
        <div className="relative w-full group">
            <textarea
                {...rest}
                ref={(e: HTMLTextAreaElement | null) => {
                    ref(e);
                    if (e) {
                        e.style.height = 'auto';
                        e.style.height = e.scrollHeight + 'px';
                    }
                }}
                placeholder={placeholder}
                className="input-textarea pr-16"
                rows={1}
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                }}
            />
            {showArrow && (
                <button
                    type="button"
                    onPointerDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-0 bottom-3 w-10 h-10 bg-white text-black flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform z-20"
                    tabIndex={-1}
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            )}
            <span className="absolute right-12 bottom-6 text-[9px] opacity-20 hidden md:inline-block uppercase tracking-widest font-mono pointer-events-none group-focus-within:opacity-40 transition-opacity">
                Aperte ENTER
            </span>
        </div>
    );
}

// ========== NAVIGATION BUTTONS ==========
export function NavigationButtons({
    onNext,
    onBack,
    onSkip,
    skipLabel = "Pular",
    showBack = true,
    showNext = true,
    nextLabel = "Próximo",
    isSubmitting = false,
    showEnterHint = true
}: {
    onNext: () => void,
    onBack?: () => void,
    onSkip?: () => void,
    skipLabel?: string,
    showBack?: boolean,
    showNext?: boolean,
    nextLabel?: string,
    isSubmitting?: boolean,
    showEnterHint?: boolean
}) {
    return (
        <div className="mt-12 flex items-center gap-4">
            {showBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="h-[52px] px-8 border border-white/10 text-white/50 hover:text-white hover:border-white hover:bg-white/5 transition-all text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
                >
                    Voltar
                </button>
            )}

            {onSkip && (
                <button
                    type="button"
                    onClick={onSkip}
                    className="h-[52px] px-8 border border-white/5 text-white/30 hover:text-white hover:border-white hover:bg-white/5 transition-all text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
                >
                    {skipLabel}
                </button>
            )}

            {showNext && (
                <button
                    type="button"
                    onClick={onNext}
                    disabled={isSubmitting}
                    className="btn-next h-[52px] flex items-center justify-center min-w-[160px] relative overflow-hidden group"
                >
                    <span className="relative z-10">{nextLabel}</span>
                    {showEnterHint && !isSubmitting && (
                        <span className="ml-4 text-[9px] opacity-30 hidden md:inline-block border-l border-black/20 pl-4 relative z-10 uppercase tracking-widest font-mono">
                            ENTER
                        </span>
                    )}
                </button>
            )}
        </div>
    );
}

export function ErrorDisplay({ message }: { message?: string | undefined }) {
    return (
        <div className={`mt-6 h-4 flex items-center gap-2 transition-all duration-300 ${message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <AlertCircle className="w-[14px] h-[14px] text-red-500/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-red-500/80">{message}</span>
        </div>
    );
}

