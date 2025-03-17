import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, lastName, email, country, phone, message } = body;

    // Validate inputs
    if (!name || !lastName || !email || !country || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Configuración para el servicio de correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar email
    const mailOptions = {
      from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto de ${name} ${lastName}`,
      text: `
        Nombre: ${name} ${lastName}
        Email: ${email}
        País: ${country}
        Teléfono: ${phone || 'No proporcionado'}
        
        Mensaje:
        ${message}
      `,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>País:</strong> ${country}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email enviado exitosamente' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al enviar el email', 
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    );
  }
}