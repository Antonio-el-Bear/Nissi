const ALLOWED_METHODS = new Set(['GET', 'POST']);
const ALLOWED_SERVICES = new Set(['individual', 'couples', 'trauma', 'children-students']);

function sendJson(response, status, payload) {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(payload));
}

function toSafeString(value, maxLength = 500) {
  return String(value || '').trim().slice(0, maxLength);
}

function parseRequestBody(request) {
  if (!request.body) {
    return {};
  }

  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }

  return request.body;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildAppointment(payload) {
  return {
    id: `appt_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
    name: toSafeString(payload.name, 120),
    email: toSafeString(payload.email, 160),
    phone: toSafeString(payload.phone, 40),
    service_type: toSafeString(payload.service_type, 40),
    preferred_time: toSafeString(payload.preferred_time, 180),
    message: toSafeString(payload.message, 2000),
  };
}

function validateAppointment(appointment) {
  if (!appointment.name) {
    return 'Name is required.';
  }

  if (!appointment.email || !isValidEmail(appointment.email)) {
    return 'A valid email is required.';
  }

  if (!appointment.service_type || !ALLOWED_SERVICES.has(appointment.service_type)) {
    return 'A valid service type is required.';
  }

  return null;
}

function buildAdminEmail(appointment) {
  const serviceLabel = appointment.service_type.replace(/-/g, ' ');
  return {
    subject: `New Nissi booking request from ${appointment.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 12px;">New Booking Request</h2>
        <p><strong>Name:</strong> ${appointment.name}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Phone:</strong> ${appointment.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${serviceLabel}</p>
        <p><strong>Preferred Time:</strong> ${appointment.preferred_time || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${appointment.message || 'No additional context provided.'}</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 12px; color: #6b7280;">Appointment ID: ${appointment.id}</p>
      </div>
    `,
  };
}

function buildAutoReplyEmail(appointment) {
  return {
    subject: 'Your Nissi booking request has been received',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
        <h2 style="margin-bottom: 12px;">Your first step is in motion.</h2>
        <p>Hi ${appointment.name},</p>
        <p>Thank you for reaching out to Tamar Nissi. Your request has been received, and a follow-up will be sent within 24 hours with clear next steps.</p>
        <p>You do not need to do anything else right now. This space is designed to feel calm, clear, and pressure-free.</p>
        <p style="margin-top: 24px;">Warmly,<br />Nissi Therapy Practice</p>
      </div>
    `,
  };
}

async function sendResendEmail({ to, subject, html, replyTo }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.APPOINTMENT_FROM_EMAIL || 'Nissi Therapy <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to send email via Resend.');
  }
}

export default async function handler(request, response) {
  if (!ALLOWED_METHODS.has(request.method)) {
    response.setHeader('Allow', Array.from(ALLOWED_METHODS).join(', '));
    return sendJson(response, 405, { error: 'Method not allowed.' });
  }

  if (request.method === 'GET') {
    return sendJson(response, 200, {
      ok: true,
      service: 'appointments-api',
      configured: Boolean(process.env.RESEND_API_KEY && process.env.APPOINTMENT_NOTIFICATION_EMAIL),
    });
  }

  const appointment = buildAppointment(parseRequestBody(request));
  const validationError = validateAppointment(appointment);

  if (validationError) {
    return sendJson(response, 400, { error: validationError });
  }

  if (!process.env.RESEND_API_KEY || !process.env.APPOINTMENT_NOTIFICATION_EMAIL) {
    return sendJson(response, 500, {
      error: 'Appointment backend is not configured. Add RESEND_API_KEY and APPOINTMENT_NOTIFICATION_EMAIL in Vercel.',
    });
  }

  try {
    const adminEmail = buildAdminEmail(appointment);
    await sendResendEmail({
      to: process.env.APPOINTMENT_NOTIFICATION_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
      replyTo: appointment.email,
    });

    try {
      const autoReply = buildAutoReplyEmail(appointment);
      await sendResendEmail({
        to: appointment.email,
        subject: autoReply.subject,
        html: autoReply.html,
      });
    } catch {
      // Auto-reply failure should not block the main booking submission.
    }

    return sendJson(response, 201, { ok: true, appointment });
  } catch (error) {
    return sendJson(response, 502, {
      error: 'Unable to deliver the booking request right now.',
      detail: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}