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
    const options = ['Branding', 'Identidade Visual', 'Site', 'Design de Produto', 'Full Experience'];

    return (
        <StepContainer isActive={true} step={5}>
            <StepHeader stepNumber="05" title="O Ritual" question="No que vamos trabalhar juntos?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {options.map((opt) => (
                    <OptionCard
                        key={opt}
                        label={
                            opt === 'Site' ? 'Landing Page / Site UX' :
                                opt === 'Full Experience' ? 'Full Experience (Tudo)' :
                                    opt === 'Branding' ? 'Branding Completo' :
                                        opt === 'Design de Produto' ? 'Design de Produto / Embalagem' :
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
