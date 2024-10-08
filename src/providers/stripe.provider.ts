import { config } from '@/providers/config.provider.js';
import Stripe from 'stripe';

export const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});
