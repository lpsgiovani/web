'use client';
import { StepContainer, StepHeader, OptionCard, NavigationButtons, ErrorDisplay } from '../components/Common';

interface StepProps {
    onNext: () => void;
    onBack: () => void;
    selectedValue: string;
    onSelect: (value: string) => void;
    error?: string | undefined;
    isTransitioning?: boolean;
}

export default function Step5({ onNext, onBack, selectedValue, onSelect, error, isTransitioning = false }: StepProps) {
    const options = ['Landing Page', 'Site Institucional', 'E-commerce', 'Plataforma Web'];

    return (
        <StepContainer isActive={true} step={5}>
            <StepHeader stepNumber="05" title="O Ritual" question="No que vamos trabalhar juntos?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {options.map((opt) => (
                    <OptionCard
                        key={opt}
                        label={
                            opt === 'Landing Page' ? 'Landing Page / Página de Vendas' :
                                opt === 'Site Institucional' ? 'Site Institucional / Corporativo' :
                                    opt === 'E-commerce' ? 'E-commerce / Loja Virtual' :
                                        opt === 'Plataforma Web' ? 'Plataforma Web / SaaS / App' :
                                            opt
                        }
                        selected={selectedValue === opt}
                        onClick={() => onSelect(opt)}
                        isDisabled={isTransitioning}
                    />
                ))}
            </div>
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showNext={false} />
        </StepContainer>
    );
}
