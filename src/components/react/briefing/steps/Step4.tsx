'use client';
import { StepContainer, StepHeader, NavigationButtons, ErrorDisplay, InputWithArrowMasked } from '../components/Common';
import type { UseFormRegister } from 'react-hook-form';

interface StepProps {
    register: UseFormRegister<any>;
    onNext: () => void;
    onBack: () => void;
    handleWhatsAppChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | undefined;
}

export default function Step4({ register, onNext, onBack, handleWhatsAppChange, error }: StepProps) {
    return (
        <StepContainer isActive={true} step={4}>
            <StepHeader stepNumber="04" title="Conexão" question="Seu WhatsApp para um papo rápido?" />
            <InputWithArrowMasked
                register={register}
                name="whatsapp"
                placeholder="(00) 00000-0000"
                onNext={onNext}
                onChange={handleWhatsAppChange}
                type="tel"
            />
            <ErrorDisplay message={error} />
            <NavigationButtons onNext={onNext} onBack={onBack} showNext={false} />
        </StepContainer>
    );
}
