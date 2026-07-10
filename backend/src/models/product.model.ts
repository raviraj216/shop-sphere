import { Schema, model } from "mongoose";
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        description: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discountPrice: {
            type: Number,
            default: 0,
        },

        sku: {
            type: String,
            unique: true,
        },

        quantity: {
            type: Number,
            default: 0,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },

        images: [
            {
                type: String,
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model("Product", productSchema);
