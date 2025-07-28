// src/config/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// This is your test publishable API key.
const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

export default stripePromise;