import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
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

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true
        },

        items: [cartItemSchema],

        totalItems: {
            type: Number,
            default: 0
        },

        subtotal: {
            type: Number,
            default: 0
        },

        discount: {
            type: Number,
            default: 0
        },

        tax: {
            type: Number,
            default: 0
        },

        shipping: {
            type: Number,
            default: 0
        },

        grandTotal: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const Cart = model("Cart", cartSchema);