import { Router, Request, Response } from 'express';
import Stripe from 'stripe';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const DOMAIN = process.env.NODE_ENV === 'production' 
  ? 'https://nomadworks.replit.app' 
  : 'http://localhost:5000';

/**
 * Create a Stripe checkout session for the Nomad Guide
 */
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'The Ultimate Digital Nomad Guide',
              description: 'Comprehensive 120-page handbook for digital nomads',
              images: ['https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=800'],
            },
            unit_amount: 1299, // $12.99 in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_id: 'nomad-guide-pdf',
        customer_email: email,
      },
      mode: 'payment',
      success_url: `${DOMAIN}/nomad-guide/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/nomad-guide`,
    });

    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating checkout session',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

/**
 * Webhook handler for Stripe events
 */
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;

  try {
    // If we have a webhook secret, verify the signature
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(
        req.body, 
        sig, 
        endpointSecret
      );
    } else {
      // For testing, just use the body directly
      event = req.body;
    }
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Here you would fulfill the order
        console.log('Payment successful:', session);
        
        // You could send the digital product to the customer's email here
        // Or update a database to mark the purchase as completed
        
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message || 'Unknown error'}`);
  }
});

/**
 * Get checkout session details
 */
router.get('/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    res.json({
      success: true,
      session
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving session',
      error: process.env.NODE_ENV !== 'production' ? error : undefined
    });
  }
});

export default router;