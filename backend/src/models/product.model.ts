import { Schema, model} from "mongoose";

const productSchema = new Schema(
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
 
export const Product = model("Product", productSchema);