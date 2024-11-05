import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'misael86@ethereal.email',
        pass: 'Rc3mfDkvRz3pJ9nnmp'
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { formData } = req.body;

  // Compose the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
}
