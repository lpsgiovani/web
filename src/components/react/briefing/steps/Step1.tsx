'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay, InputWithArrow } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    error?: string | undefined;
}

export default function Step1({ register, onNext, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={1}>
            <StepHeader stepNumber="01" title="O Início" question="Primeiro, como podemos te chamar?" />
            <InputWithArrow
                register={register}
                name="nome"
                placeholder="Seu nome"
                onNext={onNext}
                autoComplete="off"
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} showBack={false} showNext={false} />
        </StepContainer>
    );
}
