import { Schema, model, HydratedDocument } from "mongoose";

export interface IProduct {
    name: string;
    slug: string;
    description: string;
    price: number;
    discountPrice: number;
    quantity: number;
    sku: string;
    images: string[];
    category: Schema.Types.ObjectId;
    isActive: boolean;
    deletedAt: Date | null;
}


const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        description: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        discountPrice: {
            type: Number,
            default: 0
        },

        quantity: {
            type: Number,
            default: 0
        },

        sku: {
            type: String,
            unique: true
        },

        images: [
            {
                type: String
            }
        ],

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },

        isActive: {
            type: Boolean,
            default: true
        },

        deletedAt: {
            type: Date,
            default: null
        }

    },
    {
        timestamps: true
    }
);

productSchema.index({
    name: "text",
    description: "text",
});

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
 
export const Product = model<IProduct>("Product", productSchema);

export type ProductDocument = HydratedDocument<IProduct>;