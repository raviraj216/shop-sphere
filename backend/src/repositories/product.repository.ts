import { FilterQuery } from "mongoose";
import { Product } from "../models/product.model";
import { ProductQuery } from "../types/product-query";
import { AppError } from "../utils/app-error";
 export class ProductRepository {
    async create(data: any) {
        const [slugExists, skuExists] = await Promise.all([
            Product.exists({ slug: data.slug }),
            Product.exists({ sku: data.sku })
        ]);

        if (slugExists) {
            throw new AppError("Slug already exists",400);
        }

        if (skuExists) {
             throw new AppError("SKU already exists",400);
        }
        return Product.create(data);
    }

    async update(id: string, data: any) {

        return Product.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );

    }

    async softDelete(id: string) {

        return Product.findByIdAndUpdate(
            id,
            {
                deletedAt: new Date(),
                isActive: false
            },
            {
                new: true
            }
        );

    }

    async restore(id: string) {

        return Product.findByIdAndUpdate(
            id,
            {
                deletedAt: null,
                isActive: true
            },
            {
                new: true
            }
        );

    }

    async findProducts(query: ProductQuery) {

        const filter: FilterQuery<any> = {

            deletedAt: null,

            isActive: true

        };

        if (query.search) {

            filter.$text = {

                $search: query.search

            };

        }

        if (query.category) {

            filter.category = query.category;

        }

        if (query.minPrice || query.maxPrice) {

            filter.price = {};

            if (query.minPrice) {

                filter.price.$gte = query.minPrice;

            }

            if (query.maxPrice) {

                filter.price.$lte = query.maxPrice;

            }

        }

        const page = Number(query.page ?? 1);

        const limit = Number(query.limit ?? 10);

        const skip = (page - 1) * limit;

        let sort: Record<string, 1 | -1> = {

            createdAt: -1

        };

        switch (query.sort) {

            case "price_asc":

                sort = { price: 1 };

                break;

            case "price_desc":

                sort = { price: -1 };

                break;

            case "name":

                sort = { name: 1 };

                break;

        }

        const [products, total] = await Promise.all([

            Product.find(filter)
                .populate("category")
                .sort(sort)
                .skip(skip)
                .limit(limit),

            Product.countDocuments(filter)

        ]);

        return {

            products,

            pagination: {

                total,

                page,

                limit,

                totalPages: Math.ceil(total / limit)

            }
        };
    }

    async findAll() {
        console.log("repository");
        return Product.find().populate("category");
    }

    async findById(id: string) {
        //return Product.findById(id).populate("category");

        return Product.findOne({
            _id: id,
            deletedAt: null,
            isActive: true
        }).populate("category");;

    }
}
