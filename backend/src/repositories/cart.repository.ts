import { Cart } from "../models/cart.model";

export class CartRepository {

    async findByUser(
        userId: string,
    ) {

        return Cart.findOne({
            user: userId
        })
        .populate("items.product") ;

    }

    async create(userId: string) {

        return Cart.create({

            user: userId,

            items: []

        });

    }

    async save(
        cart: any,
    ) {

        return cart.save({
            cart
        });

    }

}