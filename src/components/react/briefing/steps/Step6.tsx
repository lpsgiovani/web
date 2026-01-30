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

export default function Step6({ onNext, onBack, selectedValue, onSelect, error, isTransitioning = false }: StepProps) {
    const options = ['Até 3k', '3k-6k', '6k-12k', '12k-20k', '20k+'];

    return (
        <StepContainer isActive={true} step={6}>
            <StepHeader stepNumber="06" title="Investimento" question="Qual o investimento estimado?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {options.map((opt) => (
                    <OptionCard
                        key={opt}
                        label={
                            opt === 'Até 3k' ? 'Até R$ 3.000' :
                                opt === '20k+' ? 'Acima de R$ 20.000' :
                                    opt === '3k-6k' ? 'R$ 3.000 — R$ 6.000' :
                                        opt === '6k-12k' ? 'R$ 6.000 — R$ 12.000' :
                                            'R$ 12.000 — R$ 20.000'
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
