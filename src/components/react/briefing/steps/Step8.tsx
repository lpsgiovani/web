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
            <StepHeader stepNumber="08" title="Profundidade" question="Fale um pouco sobre o projeto." />
            <TextareaWithArrow
                register={register}
                name="descricao"
                placeholder="Descrição do projeto"
                onNext={onNext}
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showNext={false} />
        </StepContainer>
    );
}
