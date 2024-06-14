import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  console.log("API Route Called"); // Add this line
  if (req.method === 'POST') {
    const { amount } = req.body;
    console.log("Amount:", amount); // Add this line
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Amount in cents
        currency: 'usd',
      });
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
