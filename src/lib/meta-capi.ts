import crypto from 'crypto';

interface MetaEvent {
    event_name: 'Lead' | 'Contact' | 'PageView' | 'CompleteRegistration';
    event_time: number;
    action_source: 'website';
    user_data: {
        em?: string[]; // Email (hashed)
        ph?: string[]; // Phone (hashed)
        client_ip_address?: string;
        client_user_agent?: string;
        fbc?: string; // Facebook Click ID
        fbp?: string; // Facebook Browser ID
    };
    custom_data?: Record<string, any>;
    event_source_url?: string;
}

/**
 * Hash data using SHA-256 for Meta CAPI
 */
function hashData(data: string): string {
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}

/**
 * Envia um evento de conversão para a API da Meta
 */
export async function trackMetaServerEvent(event: Partial<MetaEvent> & {
    raw_user_data?: { email?: string; phone?: string }
}) {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
        console.warn('[Meta CAPI] Pixel ID ou Access Token não configurados');
        return null;
    }

    // Processar dados do usuário (hashing)
    const userData = { ...event.user_data } as any;

    if (event.raw_user_data?.email) {
        userData.em = [hashData(event.raw_user_data.email)];
    }

    if (event.raw_user_data?.phone) {
        userData.ph = [hashData(event.raw_user_data.phone)];
    }

    const payload = {
        data: [
            {
                event_name: event.event_name || 'Lead',
                event_time: Math.floor(Date.now() / 1000),
                action_source: 'website',
                user_data: userData,
                custom_data: event.custom_data || {},
                event_source_url: event.event_source_url || 'https://primitiva.cc',
            },
        ],
    };

    try {
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error('[Meta CAPI] Erro ao enviar evento:', result);
        }

        return result;
    } catch (error) {
        console.error('[Meta CAPI] Erro de conexão:', error);
        return null;
    }
}
