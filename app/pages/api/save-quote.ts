import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { formData } = req.body;

    try {
      // Create a transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send the email
      const mailOptions = {
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: formData.email,
        subject: 'Your Service Quote',
        text: `Here is your quote:\n\nService: ${formData.service}\nDetails: ${formData.serviceDetails}\nEstimated Cost: $100\n\nThank you for choosing our service!`,
      };

      const info = await transporter.sendMail(mailOptions);

      console.log('Message sent: %s', info.messageId);

      res.status(200).json({ message: 'Quote saved and email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
