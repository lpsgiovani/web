export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { getPostHogClient } from '../../lib/posthog-server';

export const POST: APIRoute = async ({ request }) => {
    // Instantiate Resend inside the handler to prevent build-time execution
    const resend = new Resend(import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY);

    try {
        const body = await request.json();
        const { type, data } = body;

        // Validate request
        if (!type || !data) {
            return new Response(JSON.stringify({ error: 'Missing required fields: type and data' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Determine email content based on form type
        let subject = '';
        let htmlContent = '';

        switch (type) {
            case 'briefing':
                subject = `Novo Briefing Primitiva: ${data.empresa || 'Cliente'}`;
                htmlContent = generateBriefingEmail(data);
                break;
            case 'brand':
                subject = `Novo Briefing de Marca: ${data.company_name || 'Cliente'}`;
                htmlContent = generateBrandEmail(data);
                break;
            case 'site':
                subject = `Novo Briefing de Site: ${data.company_name || 'Cliente'}`;
                htmlContent = generateSiteEmail(data);
                break;
            default:
                return new Response(JSON.stringify({ error: 'Invalid form type' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
        }

        const { data: emailData, error } = await resend.emails.send({
            from: 'Primitiva <contato@mail.primitiva.cc>',
            to: ['heyprimitiva@gmail.com'],
            subject: subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Resend error:', error);
            return new Response(JSON.stringify({ error: 'Failed to send email' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // PostHog: Track successful email sent (server-side)
        const posthog = getPostHogClient();
        const distinctId = data.email || data.whatsapp || data.company_name || 'anonymous';
        posthog.capture({
            distinctId: distinctId,
            event: 'briefing_email_sent',
            properties: {
                briefing_type: type,
                company_name: data.company_name || data.empresa || null,
                email_id: emailData?.id,
                source: 'api'
            }
        });

        return new Response(JSON.stringify({ success: true, id: emailData?.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('API error:', error);
        // PostHog: Capture API error
        const posthog = getPostHogClient();
        posthog.capture({
            distinctId: 'system',
            event: '$exception',
            properties: {
                $exception_type: 'send_email_error',
                $exception_message: error instanceof Error ? error.message : String(error),
                source: 'api'
            }
        });
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// ========== EMAIL TEMPLATES ==========

function generateBriefingEmail(data: Record<string, any>): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #000; font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; }
            h2 { color: #666; font-size: 16px; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px; }
            .field { margin: 10px 0; padding: 15px; background: #f9f9f9; border-left: 3px solid #000; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #000; margin-top: 5px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
    </head>
    <body>
        <h1>🎯 Novo Briefing Recebido</h1>
        
        <h2>Informações de Contato</h2>
        <div class="field">
            <div class="label">Nome</div>
            <div class="value">${data.nome || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Empresa</div>
            <div class="value">${data.empresa || '-'}</div>
        </div>
        <div class="field">
            <div class="label">E-mail</div>
            <div class="value">${data.email || '-'}</div>
        </div>
        <div class="field">
            <div class="label">WhatsApp</div>
            <div class="value">${data.whatsapp || '-'}</div>
        </div>
        
        <h2>Detalhes do Projeto</h2>
        <div class="field">
            <div class="label">Serviço</div>
            <div class="value">${data.servico || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Investimento</div>
            <div class="value">${data.investimento || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Prazo</div>
            <div class="value">${data.prazo || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Descrição</div>
            <div class="value">${data.descricao || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Como nos conheceu</div>
            <div class="value">${data.origem || '-'}</div>
        </div>
        
        <div class="footer">
            Enviado via Primitiva Briefing System
        </div>
    </body>
    </html>
    `;
}

function generateBrandEmail(data: Record<string, any>): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #000; font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; }
            h2 { color: #666; font-size: 16px; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px; }
            .field { margin: 10px 0; padding: 15px; background: #f9f9f9; border-left: 3px solid #000; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #000; margin-top: 5px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
    </head>
    <body>
        <h1>🎨 Briefing de Marca</h1>
        
        <h2>Contato</h2>
        <div class="field">
            <div class="label">Nome do Contato</div>
            <div class="value">${data.contact_name || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Nome da Empresa</div>
            <div class="value">${data.company_name || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Tempo de Mercado</div>
            <div class="value">${data.years_in_business || '-'}</div>
        </div>
        
        <h2>Essência da Marca</h2>
        <div class="field">
            <div class="label">História de Origem</div>
            <div class="value">${data.origin_story || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Valores Principais</div>
            <div class="value">${data.main_values || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Impacto Transformador</div>
            <div class="value">${data.transformative_impact || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Visão de Futuro</div>
            <div class="value">${data.vision_future || '-'}</div>
        </div>
        
        <h2>Público</h2>
        <div class="field">
            <div class="label">Classe Social</div>
            <div class="value">${data.audience_class || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Faixa Etária</div>
            <div class="value">${data.audience_age || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Gênero</div>
            <div class="value">${data.audience_gender || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Perfil Psicográfico</div>
            <div class="value">${data.dream_client_psychographics || '-'}</div>
        </div>
        
        <h2>Personalidade</h2>
        <div class="field">
            <div class="label">Traços de Personalidade</div>
            <div class="value">${Array.isArray(data.brand_personality_traits) ? data.brand_personality_traits.join(', ') : '-'}</div>
        </div>
        <div class="field">
            <div class="label">Top 3 Traços</div>
            <div class="value">${data.top_3_traits || '-'}</div>
        </div>
        <div class="field">
            <div class="label">O que a marca NÃO é</div>
            <div class="value">${Array.isArray(data.brand_not_person) ? data.brand_not_person.join(', ') : '-'}</div>
        </div>
        <div class="field">
            <div class="label">Analogia da Marca</div>
            <div class="value">${data.brand_analogy || '-'}</div>
        </div>
        
        <h2>Calibragem de Personalidade</h2>
        <div class="field">
            <div class="label">Tradicional ↔ Disruptiva</div>
            <div class="value">${data.personality_s1 || 3}/5</div>
        </div>
        <div class="field">
            <div class="label">Brincalhona ↔ Séria</div>
            <div class="value">${data.personality_s2 || 3}/5</div>
        </div>
        <div class="field">
            <div class="label">Acessível ↔ Exclusiva</div>
            <div class="value">${data.personality_s3 || 3}/5</div>
        </div>
        <div class="field">
            <div class="label">Sutil/Minimal ↔ Vibrante</div>
            <div class="value">${data.personality_s4 || 3}/5</div>
        </div>
        <div class="field">
            <div class="label">Tecnológica ↔ Humana</div>
            <div class="value">${data.personality_s5 || 3}/5</div>
        </div>
        
        <h2>Aplicações</h2>
        <div class="field">
            <div class="label">Touchpoints</div>
            <div class="value">${Array.isArray(data.touchpoints) ? data.touchpoints.join(', ') : '-'}</div>
        </div>
        <div class="field">
            <div class="label">Considerações Finais</div>
            <div class="value">${data.final_considerations || '-'}</div>
        </div>
        
        <div class="footer">
            Enviado via Primitiva Briefing System
        </div>
    </body>
    </html>
    `;
}

function generateSiteEmail(data: Record<string, any>): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #000; font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; }
            h2 { color: #666; font-size: 16px; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px; }
            .field { margin: 10px 0; padding: 15px; background: #f9f9f9; border-left: 3px solid #000; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { font-size: 16px; color: #000; margin-top: 5px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
        </style>
    </head>
    <body>
        <h1>🌐 Briefing de Site</h1>
        
        <h2>Contato</h2>
        <div class="field">
            <div class="label">Nome do Contato</div>
            <div class="value">${data.contact_name || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Nome da Empresa</div>
            <div class="value">${data.company_name || '-'}</div>
        </div>
        
        <h2>Estratégia Digital</h2>
        <div class="field">
            <div class="label">Objetivo Principal</div>
            <div class="value">${Array.isArray(data.main_objective) ? data.main_objective.join(', ') : '-'}</div>
        </div>
        <div class="field">
            <div class="label">Fontes de Tráfego</div>
            <div class="value">${Array.isArray(data.traffic_source) ? data.traffic_source.join(', ') : '-'}</div>
        </div>
        
        <h2>UX & Conteúdo</h2>
        <div class="field">
            <div class="label">Páginas Essenciais</div>
            <div class="value">${data.essential_pages || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Status do Conteúdo</div>
            <div class="value">${data.content_status || '-'}</div>
        </div>
        
        <h2>UI & Design</h2>
        <div class="field">
            <div class="label">Vibe Visual (Estático ↔ Animado)</div>
            <div class="value">${data.visual_vibe || 3}/5</div>
        </div>
        <div class="field">
            <div class="label">Referências</div>
            <div class="value">${data.references || '-'}</div>
        </div>
        
        <h2>Stack Técnica</h2>
        <div class="field">
            <div class="label">Necessidade de CMS</div>
            <div class="value">${data.cms_needs || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Funcionalidades</div>
            <div class="value">${Array.isArray(data.functionalities) ? data.functionalities.join(', ') : '-'}</div>
        </div>
        
        <h2>Logística</h2>
        <div class="field">
            <div class="label">Domínio/Hospedagem</div>
            <div class="value">${data.domain_hosting || '-'}</div>
        </div>
        <div class="field">
            <div class="label">Prazo</div>
            <div class="value">${data.deadline || '-'}</div>
        </div>
        
        <div class="footer">
            Enviado via Primitiva Briefing System
        </div>
    </body>
    </html>
    `;
}
