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
    const options = ['Até 5k', '5k-15k', '15k-30k', '30k-60k', '60k+'];

    return (
        <StepContainer isActive={true} step={6}>
            <StepHeader stepNumber="06" title="Investimento" question="Qual o investimento estimado?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {options.map((opt) => (
                    <OptionCard
                        key={opt}
                        label={
                            opt === 'Até 5k' ? 'Até R$ 5.000' :
                                opt === '60k+' ? 'Acima de R$ 60.000' :
                                    opt === '5k-15k' ? 'R$ 5.000 — R$ 15.000' :
                                        opt === '15k-30k' ? 'R$ 15.000 — R$ 30.000' :
                                            'R$ 30.000 — R$ 60.000'
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
