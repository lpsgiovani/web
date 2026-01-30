/**
 * Google Analytics Measurement Protocol (Server-side) Utility
 * 
 * Permite enviar eventos de conversão diretamente do servidor para o GA4.
 */

export async function trackGAServerEvent(eventName: string, params: Record<string, any> = {}) {
    const measurementId = process.env.NEXT_PUBLIC_GA_ID;
    const apiSecret = process.env.GA_API_SECRET;

    if (!measurementId || !apiSecret) {
        console.warn('[GA Measurement Protocol] ID ou Secret não configurados');
        return null;
    }

    // O GA4 exige um client_id. Podemos usar um valor genérico ou o ID do PostHog/Lead.
    const clientId = params.lead_id || 'anonymous_server_client';

    const payload = {
        client_id: clientId.toString(),
        events: [
            {
                name: eventName,
                params: {
                    engagement_time_msec: '100',
                    session_id: Date.now().toString(),
                    ...params,
                },
            },
        ],
    };

    try {
        const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('[GA Measurement Protocol] Erro ao enviar evento:', text);
        }

        return true;
    } catch (error) {
        console.error('[GA Measurement Protocol] Erro de conexão:', error);
        return null;
    }
}
