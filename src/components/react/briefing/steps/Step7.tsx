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

export default function Step7({ onNext, onBack, selectedValue, onSelect, error, isTransitioning = false }: StepProps) {
    const options = [
        { val: 'Urgente', label: 'Para ontem (Urgente)' },
        { val: '1 Mes', label: 'Até 1 mês' },
        { val: '2-3 Meses', label: '2 a 3 meses' },
        { val: 'Sem Pressa', label: 'Sem pressa, foco em qualidade' }
    ];

    return (
        <StepContainer isActive={true} step={7}>
            <StepHeader stepNumber="07" title="Tempo" question="Qual o prazo desejado?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {options.map((opt) => (
                    <OptionCard
                        key={opt.val}
                        label={opt.label}
                        selected={selectedValue === opt.val}
                        onClick={() => onSelect(opt.val)}
                        isDisabled={isTransitioning}
                    />
                ))}
            </div>
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showNext={false} />
        </StepContainer>
    );
}
