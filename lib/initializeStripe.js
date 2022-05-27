import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

export const initializeStripe = async () => {
  try {
    if (!stripePromise) {
      stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_KEY
      );
    }
    return stripePromise;
  } catch (e) {
    console.error(e);
  }
};
