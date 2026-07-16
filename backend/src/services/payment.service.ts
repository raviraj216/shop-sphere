import Stripe from "stripe";
import { stripe } from "../config/stripe";
import { PaymentStatus } from "../models/order.model";

import { OrderRepository } from "../repositories/order.repository";

export class PaymentService {

    private orderRepository =
        new OrderRepository();

    async createPaymentIntent(

        orderId: string

    ) {

        const order =
            await this.orderRepository.findById(orderId);

        if (!order) {

            throw new Error("Order not found");

        }

        if (order.paymentStatus === PaymentStatus.Paid) {
            throw new Error("Order already paid");

        }

        const paymentIntent =
            await stripe.paymentIntents.create({

                amount:

                    Math.round(

                        order.grandTotal * 100

                    ),

                currency: "inr",

                metadata: {

                    orderId:

                        order._id.toString()

                }

            });

        return {

            clientSecret:

                paymentIntent.client_secret

        };

    }

    private async handlePaymentSuccess(
        paymentIntent: Stripe.PaymentIntent

    ) {

        const orderId = paymentIntent.metadata.orderId;

        const order =  await this.orderRepository.findById(
                orderId
            );

        if (!order) {
            throw new Error(
                "Order not found"
            );
        }

        if ( order.paymentStatus === PaymentStatus.Paid ) {
            return;
        }
        order.paymentStatus = PaymentStatus.Paid;
        order.stripePaymentIntentId =  paymentIntent.id;
        await order.save();

    }
    async handleWebhook(
        event: Stripe.Event
    ) {

        switch (event.type) {

            case "payment_intent.succeeded":
                //send success email and update order payment status
                await this.handlePaymentSuccess(
                    event.data.object
                );
                break;

            case "payment_intent.payment_failed":
                //send failed email and update order payment status
                await this.handlePaymentFailed(
                    event.data.object
                );
                break;
        }

    }

    private async handlePaymentFailed(

        paymentIntent: Stripe.PaymentIntent

    ) {

        const orderId =  paymentIntent.metadata.orderId;

        const order = await this.orderRepository.findById(
                orderId
            );

        if (!order) {
            return;
        }

        order.paymentStatus = PaymentStatus.FAILED;

        await order.save();

    }
}