'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay, InputWithArrow } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    error?: string | undefined;
}

export default function Step2({ register, onNext, onBack, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={2}>
            <StepHeader stepNumber="02" title="A Marca" question="Qual o nome da sua empresa ou projeto?" />
            <InputWithArrow
                register={register}
                name="empresa"
                placeholder="Sua marca"
                onNext={onNext}
                autoComplete="off"
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showNext={false} />
        </StepContainer>
    );
}
