import express, { Request, Response } from 'express';
import Stripe from 'stripe';

const router = express.Router();

// Initialize Stripe with the secret key
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable. Checkout functionality will not work.');
}

// Create Stripe client safely
const stripe = new Stripe(stripeKey || 'sk_test_dummy', {
  apiVersion: '2025-02-24.acacia',
});

// The price of the digital nomad guide in cents
const GUIDE_PRICE = 1299;

/**
 * Create a Stripe checkout session for the Nomad Guide
 */
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'The Ultimate Digital Nomad Guide (2025 Edition)',
              description: 'A comprehensive 120-page guide to becoming a successful digital nomad',
              images: ['https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
            },
            unit_amount: GUIDE_PRICE,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/nomad-guide`,
    });

    res.json({ 
      success: true, 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create checkout session' 
    });
  }
});

/**
 * Webhook handler for Stripe events
 */
router.post('/webhook', async (req: Request, res: Response) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'] as string;
  
  let event;

  try {
    if (process.env.NODE_ENV === 'production' && process.env.STRIPE_WEBHOOK_SECRET) {
      // In production, verify the event came from Stripe with webhook secret
      event = stripe.webhooks.constructEvent(
        payload, 
        sig, 
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // For development/testing, we'll accept the payload as is
      console.log('Warning: Webhook signature verification skipped in non-production environment');
      event = payload;
    }

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Fulfill the order - in a real app, you would send an email with download link
        console.log(`Payment succeeded for session ${session.id}`);
        break;

      // Handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: unknown) {
    console.error('Webhook Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    res.status(400).send(`Webhook Error: ${errorMessage}`);
  }
});

/**
 * Get checkout session details
 */
router.get('/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    res.json({ success: true, session });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve session details' 
    });
  }
});

export default router;