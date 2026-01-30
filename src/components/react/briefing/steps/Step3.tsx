'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay, InputWithArrow } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    error?: string | undefined;
}

export default function Step3({ register, onNext, onBack, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={3}>
            <StepHeader stepNumber="03" title="Conexão" question="Qual seu melhor e-mail?" />
            <InputWithArrow
                register={register}
                name="email"
                placeholder="nome@exemplo"
                onNext={onNext}
                autoComplete="email"
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showNext={false} />
        </StepContainer>
    );
}
