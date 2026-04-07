import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { score, level, answers, lang, trackingCode, leadData } = data;

    // Configuration for Nodemailer
    // IMPORTANT: For production, these should be in .env.local
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your gmail
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Fallback for local testing if no ENV is set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️ Email credentials not found. Mocking email send.');
      console.log('Report Content:', { score, level, answers });
      return NextResponse.json({ success: true, message: 'Mock email sent (Check console)' });
    }

    const actionPlan = generateActionPlan(score, level, answers, lang);

    const mailOptions = {
      from: `"Ancastav Platform" <${process.env.EMAIL_USER}>`,
      to: 'actidepm@gmail.com',
      subject: `🚨 [${trackingCode || 'N/A'}] NUEVO DIAGNÓSTICO: ${level.status} (${score}%)`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2563eb; text-transform: uppercase;">Reporte de Diagnóstico Digital</h2>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
            <p style="margin: 0 0 5px 0; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 1px;">DATOS DEL CLIENTE</p>
            <p style="margin: 0; font-size: 14px; color: #0f172a;"><strong>Nombre:</strong> ${leadData?.full_name || 'N/A'}</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #0f172a;"><strong>Email:</strong> ${leadData?.email || 'N/A'}</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #0f172a;"><strong>Teléfono:</strong> ${leadData?.phone || 'N/A'}</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #0f172a;"><strong>Sector:</strong> ${leadData?.plan_selected || 'N/A'}</p>
            <p style="margin: 10px 0 0 0; font-size: 13px; color: #334155; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
              <strong>Objetivo:</strong> ${leadData?.message || 'Sin mensaje adicional'}
            </p>
          </div>

          <p><strong>ID de Seguimiento:</strong> <span style="font-family: monospace; background: #eee; padding: 2px 5px; border-radius: 4px;">${trackingCode || 'No generado'}</span></p>
          <p><strong>Nivel de Madurez:</strong> ${level.status}</p>
          <p><strong>Puntaje:</strong> ${score}%</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <h3>Plan de Acción Sugerido para ${leadData?.full_name || 'el cliente'}:</h3>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb;">
            ${actionPlan}
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #64748b;">Este reporte fue generado automáticamente por la Plataforma Ancastav PRO.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}

function generateActionPlan(score: number, level: any, answers: any, lang: string) {
  if (score <= 40) {
    return `
      <ul>
        <li><strong>Prioridad 1:</strong> Desarrollo de Infraestructura Web Core (Plan Alpha).</li>
        <li><strong>Prioridad 2:</strong> Implementación de SEO On-Page básico para visibilidad.</li>
        <li><strong>Sugerencia:</strong> El cliente no tiene bases digitales sólidas; enfocar la venta en "Presencia y Profesionalismo".</li>
      </ul>
    `;
  } else if (score <= 80) {
    return `
      <ul>
        <li><strong>Prioridad 1:</strong> Automatización de flujos de conversión (Plan Sigma).</li>
        <li><strong>Prioridad 2:</strong> Integración de Google Analytics Avanzado y CRM.</li>
        <li><strong>Sugerencia:</strong> El cliente ya tiene tracción; enfocar la venta en "Escabilidad y Ahorro de Tiempo".</li>
      </ul>
    `;
  } else {
    return `
      <ul>
        <li><strong>Prioridad 1:</strong> Optimización de Conversion Rate (CRO) y E-commerce (Plan Delta).</li>
        <li><strong>Prioridad 2:</strong> Implementación de Inteligencia Artificial para atención al cliente.</li>
        <li><strong>Sugerencia:</strong> El cliente es avanzado; enfocar la venta en "Dominio de Mercado y Eficiencia Extrema".</li>
      </ul>
    `;
  }
}
