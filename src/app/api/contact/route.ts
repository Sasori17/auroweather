import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactFormLimiter, getClientIp } from '@/lib/ratelimit';

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA secret key not configured, skipping verification');
    return true; // Allow if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    // Check if verification was successful and score is acceptable (>= 0.5)
    return data.success && (!data.score || data.score >= 0.5);
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimitResult = contactFormLimiter.check(clientIp);

    if (!rateLimitResult.allowed) {
      const waitTime = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: `Trop de tentatives. Veuillez réessayer dans ${waitTime} secondes.`
        },
        {
          status: 429,
          headers: {
            'Retry-After': waitTime.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, website, recaptchaToken } = body;

    // Honeypot check - if website field is filled, it's a bot
    if (website) {
      console.log('Bot detected via honeypot from IP:', clientIp);
      // Return success to not reveal the honeypot, but don't send email
      return NextResponse.json(
        { message: 'Message envoyé avec succès' },
        { status: 200 }
      );
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        console.log('reCAPTCHA verification failed from IP:', clientIp);
        return NextResponse.json(
          { error: 'Vérification anti-spam échouée. Veuillez réessayer.' },
          { status: 400 }
        );
      }
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Validate message length (basic spam check)
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Le message doit contenir entre 10 et 5000 caractères' },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');
      return NextResponse.json(
        { error: 'Configuration email non disponible. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD, // Use App Password, not regular password
      },
    });

    // Email to admin
    const mailOptionsToAdmin = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Send to yourself
      subject: `[AuroWeather Contact] ${subject}`,
      text: `
Nouveau message de contact depuis AuroWeather

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact d'AuroWeather.
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #4a5568; }
    .value { color: #1a202c; margin-top: 5px; }
    .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin-top: 20px; }
    .footer { text-align: center; color: #718096; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">Nouveau message de contact</h2>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">AuroWeather</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Nom:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Sujet:</div>
        <div class="value">${subject}</div>
      </div>
      <div class="message-box">
        <div class="label">Message:</div>
        <div class="value" style="white-space: pre-wrap;">${message}</div>
      </div>
      <div class="footer">
        Ce message a été envoyé depuis le formulaire de contact d'AuroWeather
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Confirmation email to user
    const mailOptionsToUser = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Confirmation de réception - AuroWeather',
      text: `
Bonjour ${name},

Nous avons bien reçu votre message concernant "${subject}".

Notre équipe vous répondra dans les plus brefs délais.

Merci de votre intérêt pour AuroWeather !

---
L'équipe AuroWeather
https://auroweather.com
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
    .footer { text-align: center; color: #718096; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">AuroWeather</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Confirmation de réception</p>
    </div>
    <div class="content">
      <p>Bonjour <strong>${name}</strong>,</p>

      <p>Nous avons bien reçu votre message concernant <strong>"${subject}"</strong>.</p>

      <p>Notre équipe examinera votre demande et vous répondra dans les plus brefs délais à l'adresse <strong>${email}</strong>.</p>

      <p>Merci de votre intérêt pour AuroWeather !</p>

      <div style="text-align: center;">
        <a href="https://auroweather.com" class="button">Retour au site</a>
      </div>

      <div class="footer">
        <p>L'équipe AuroWeather</p>
        <p>Ce message a été envoyé automatiquement, merci de ne pas y répondre.</p>
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Send emails
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}
