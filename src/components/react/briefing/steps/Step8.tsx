'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay, TextareaWithArrow } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    error?: string | undefined;
}

export default function Step8({ register, onNext, onBack, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={8}>
            <StepHeader stepNumber="08" title="Profundidade" question="Qual o objetivo central deste projeto?" />
            <TextareaWithArrow
                register={register}
                name="descricao"
                placeholder="Ex: Aumentar conversão, automatizar processos, nova presença digital, resolver problemas de performance..."
                onNext={onNext}
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showNext={false} />
        </StepContainer>
    );
}
