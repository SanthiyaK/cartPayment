import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function createPaymentIntent(totalPrice) {
  const amount = Math.round(parseFloat(totalPrice) * 100); // Convert to cents

  try {
    // Create a payment intent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: 'Test Payment',
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error
  }
}