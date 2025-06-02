'use client';

import React, { useCallback } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

// Load Stripe using the publishable key from the environment
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  // Callback to fetch the Stripe client secret
  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post('/api/payment', {
      bookingId: bookingId,
    });
    return response.data.clientSecret;
  }, [bookingId]); // ✅ Correctly include bookingId as a dependency

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default CheckoutPage;