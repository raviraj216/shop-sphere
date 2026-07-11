import { CartRepository } from "../repositories/cart.repository";
import { ProductRepository } from "../repositories/product.repository";
import { AppError } from "../utils/app-error";

export class CartService {

    private cartRepository = new CartRepository();

    private productRepository = new ProductRepository();

    async getOrCreateCart(userId: string) {

        let cart = await this.cartRepository.findByUser(userId);

        if (!cart) {

            cart = await this.cartRepository.create(userId);

        }

        return cart;

    }

    private calculateTotals(cart: any) {

        let totalItems = 0;

        let subtotal = 0;

        cart.items.forEach((item: any) => {

            item.subtotal =
                item.price * item.quantity;

            totalItems += item.quantity;

            subtotal += item.subtotal;

        });

        cart.totalItems = totalItems;

        cart.subtotal = subtotal;

        cart.discount = 0;

        cart.tax = 0;

        cart.shipping = subtotal > 1000 ? 0 : 50;

        cart.grandTotal =
            subtotal -
            cart.discount +
            cart.tax +
            cart.shipping;

    }
    
    async addToCart(

        userId: string,

        productId: string,

        quantity: number

    ) {

        const product = await this.productRepository.findById(productId);

        if (!product) {

            throw new AppError(

                "Product not found",

                404

            );

        }

        if (product.quantity < quantity) {

            throw new AppError(

                "Insufficient stock",

                400

            );

        }

        const cart = await this.getOrCreateCart(userId);

        const existingItem = cart.items.find(

            (item: any) =>

                item.product._id.toString() === productId

        );

        if (existingItem) {

            existingItem.quantity += quantity;

            if (existingItem.quantity > product.quantity) {

                throw new AppError(

                    "Quantity exceeds available stock",

                    400

                );

            }

        } else {

            cart.items.push({

                product: product._id,

                quantity,

                price: product.price,

                subtotal: product.price * quantity

            });

        }

        this.calculateTotals(cart);

        await this.cartRepository.save(cart);

        return cart.populate("items.product");

    }


    async updateQuantity(
        userId: string,
        productId: string,
        quantity: number
    ) {

        const cart = await this.getOrCreateCart(userId);

        const item = cart.items.find(
            (item: any) =>
                item.product._id.toString() === productId
        );

        if (!item) {
            throw new AppError(
                "Item not found in cart",
                404
            );
        }

        const product =
            await this.productRepository.findById(productId);

        if (!product) {
            throw new AppError(
                "Product not found",
                404
            );
        }

        if (quantity > product.quantity) {
            throw new AppError(
                "Insufficient stock",
                400
            );
        }

        item.quantity = quantity;

        this.calculateTotals(cart);

        await this.cartRepository.save(cart);

        return cart.populate("items.product");

    }


    async removeItem(
        userId: string,
        productId: string
    ) {

        const cart = await this.getOrCreateCart(userId);

        const items = cart.items.filter(
            (item: any) =>
                item.product._id.toString() !== productId
        );

        cart.items = items as any;

        this.calculateTotals(cart);

        await this.cartRepository.save(cart);

        return cart.populate("items.product");

    }

    async clearCart(userId: string) {

        const cart = await this.getOrCreateCart(userId);

        cart.items = [] as any;
        
        this.calculateTotals(cart);

        await this.cartRepository.save(cart);

        return cart;

    }

    async getCart(userId: string) {

        return this.getOrCreateCart(userId);

    }

}