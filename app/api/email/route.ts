// app/api/email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'oma26@ethereal.email',
        pass: 'tvYkYMPZf5QcPQEA11'
    }
});

export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request
    const { formData } = await req.json();

    // Define the email content
    const mailOptions = {
      from: 'oma26@ethereal.email',
      to: formData.email,
      subject: 'Your Saved Quote from Our Business',
      html: `
        <h2>Your Quote Details</h2>
        <p><strong>Service:</strong> ${formData.service}</p>
        <p><strong>Details:</strong> ${formData.serviceDetails}</p>
        <p><strong>Estimated Cost:</strong> $${formData.estimatedCost || 100}</p>
        <h3>Contact Information</h3>
        <p><strong>First Name:</strong> ${formData.firstName}</p>
        <p><strong>Last Name:</strong> ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
