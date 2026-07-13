import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        sku: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        subtotal: {
            type: Number,
            required: true
        }
    },
    {
        _id: false
    }
);

const orderSchema = new Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [orderItemSchema],

        totalItems: Number,

        subtotal: Number,

        discount: Number,

        tax: Number,

        shipping: Number,

        grandTotal: Number,

        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Packed",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Failed",
                "Refunded"
            ],
            default: "Pending"
        },

        paymentMethod: {
            type: String,
            enum: [
                "COD",
                "Razorpay",
                "Stripe"
            ],
            default: "COD"
        },

        shippingAddress: {
            fullName: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        }

    },
    {
        timestamps: true
    }
);

export const Order = model("Order", orderSchema);