import { Request, Response } from "express";

import Stripe from "stripe";

import { stripe } from "../config/stripe";

import { PaymentService } from "../services/payment.service";

const service = new PaymentService();

export const stripeWebhook =
async (

    req: Request,

    res: Response

) => {

    const signature =  req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    }  catch (error) {
        return res.status(400).send(
            "Invalid Signature"

        );
    }

    await service.handleWebhook(event);

    res.json({

        received: true

    });

};