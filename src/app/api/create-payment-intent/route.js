// app/api/create-payment-intent/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { amount, currency, metadata } = await request.json();
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            metadata,
        });
        
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}