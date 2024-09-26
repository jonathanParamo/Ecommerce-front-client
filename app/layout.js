'use client'

import './globals.css';
import ReduxProvider from './providers/ReduxProvider';
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Jade Shop</title>
        <link rel="icon" href="assets/logo.svg" />
      </head>
      <body>
        <ReduxProvider>
          <Elements stripe={stripePromise}>
            {children}
          </Elements>
        </ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
