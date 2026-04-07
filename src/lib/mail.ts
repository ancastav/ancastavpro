import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface Lead {
  full_name: string;
  plan_selected: string;
  company?: string;
  email: string;
  phone: string;
  message?: string;
}

export async function sendLeadNotification(lead: Lead) {
  const recipients = [
    'me@ancastav.com',
    'aacasilla@ancastav.com',
    'ancastavds@gmail.com',
    'actidepm@gmail.com'
  ];

  const subject = `Nuevo Lead Vanguard - ${lead.full_name} (${lead.plan_selected})`;
  
  // HTML format for a premium experience
  const emailHtml = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #2563eb; padding: 32px; text-align: center;">
        <h1 style="color: white; font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 900;">Vanguard Lead Lab</h1>
        <p style="color: #bfdbfe; font-size: 12px; margin-top: 8px; text-transform: uppercase;">Notificación de Nueva Consulta</p>
      </div>
      
      <div style="padding: 40px; background-color: white;">
        <div style="margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 24px;">
          <p style="text-transform: uppercase; font-size: 10px; color: #64748b; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 8px;">Detalles del Prospecto</p>
          <div style="display: grid; gap: 12px;">
            <p style="color: #0f172a; margin: 0; font-size: 15px;"><strong>Nombre:</strong> ${lead.full_name}</p>
            <p style="color: #0f172a; margin: 0; font-size: 15px;"><strong>Empresa:</strong> ${lead.company || 'Personal / No provista'}</p>
            <p style="color: #0f172a; margin: 0; font-size: 15px;"><strong>Email:</strong> ${lead.email}</p>
            <p style="color: #0f172a; margin: 0; font-size: 15px;"><strong>Teléfono:</strong> ${lead.phone}</p>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="text-transform: uppercase; font-size: 10px; color: #64748b; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 8px;">Plan de Inversión Seleccionado</p>
          <div style="background-color: #eff6ff; padding: 16px; border-radius: 12px; border-left: 4px solid #2563eb;">
             <p style="color: #1e40af; font-weight: bold; margin: 0; font-size: 16px;">${lead.plan_selected}</p>
          </div>
        </div>

        <div style="margin-bottom: 32px;">
          <p style="text-transform: uppercase; font-size: 10px; color: #64748b; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 8px;">Mensaje Adjunto</p>
          <p style="color: #475569; line-height: 1.6; font-style: italic; background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px dashed #cbd5e1; margin: 0;">
            "${lead.message || 'Sin mensaje adicional.'}"
          </p>
        </div>

        <div style="text-align: center;">
          <a href="mailto:${lead.email}" style="display: inline-block; background-color: #2563eb; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase;">
            Responder Directamente
          </a>
        </div>
      </div>
      
      <div style="padding: 24px; background-color: #f8fafc; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="color: #94a3b8; font-size: 11px; margin: 0;">Ancastav Digital Services Platform v3.0 | Vanguard Infrastructure</p>
        <p style="color: #cbd5e1; font-size: 10px; margin-top: 4px;">Este es un mensaje automatizado de alta prioridad.</p>
      </div>
    </div>
  `;

  console.log('--- INTENTANDO ENVIAR NOTIFICACIÓN REAL ---');
  
  if (!resend) {
    console.warn('AVISO: RESEND_API_KEY no detectada. Notificación simulada en consola.');
    console.log(`Destinatarios: ${recipients.join(', ')}`);
    console.log(`Asunto: ${subject}`);
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Vanguard Lab <notificaciones@ancastav.com>',
      to: recipients,
      subject: subject,
      html: emailHtml,
    });

    if (error) {
      console.error('Error al enviar con Resend:', error);
      return false;
    }

    console.log('Notificación enviada exitosamente via Resend:', data?.id);
    return true;
  } catch (err) {
    console.error('Excepción en el envío de correo:', err);
    return false;
  }
}
