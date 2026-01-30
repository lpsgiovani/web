import type { Metadata } from 'next';
import GeneralForm from './GeneralForm';

export const metadata: Metadata = {
    title: "Iniciar Projeto",
    description: "Conte-nos sobre o seu projeto. Vamos construir algo extraordinário juntos.",
    openGraph: {
        title: "Iniciar Projeto | Primitiva",
        description: "Conte-nos sobre o seu projeto. Vamos construir algo extraordinário juntos.",
        url: "https://primitiva.cc/briefing",
        type: "website",
        images: ["/assets/primitiva/thumb.jpg"]
    },
    alternates: {
        canonical: "https://primitiva.cc/briefing"
    }
};

export default function GeneralBriefingPage() {
    return <GeneralForm />;
}
