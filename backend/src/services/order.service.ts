import mongoose from "mongoose";
import { CheckoutDto } from "../validators/order.validator";
import { CartRepository } from "../repositories/cart.repository";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { generateOrderNumber } from "../utils/order-number";
import { AppError } from "../utils/app-error";

export class OrderService {

    private cartRepository = new CartRepository();
    private orderRepository = new OrderRepository();
    private productRepository = new ProductRepository();

    async checkout(
        userId: string,
        dto: CheckoutDto
    ) {

       // const session = await mongoose.startSession();

        try {

           // session.startTransaction();
            /**
             * 1. Load Cart
             */
            const cart = await this.cartRepository.findByUser(
                userId 
               // ,session
            );

            if (!cart) {
                throw new AppError(
                    "Cart not found",
                    404
                );
            }

            if (cart.items.length === 0) {
                throw new AppError(
                    "Cart is empty",
                    400
                );
            }

            /**
             * 2. Validate Stock
             */

            for (const item of cart.items) {


                const product =
                    await this.productRepository.findById(
                        item.product._id.toString()
                        //, session
                    );

                if (!product) {
                    throw new AppError(
                        `${item.product.name} not found`,
                        404
                    );
                }

                if (!product.isActive) {
                    throw new AppError(
                        `${product.name} is inactive`,
                        400
                    );
                }

                if (product.quantity < item.quantity) {
                    throw new AppError(
                        `Only ${product.quantity} quantity available for ${product.name}`,
                        400
                    );
                }

            }

            /**
             * 3. Create Order
             */

            const order = await this.orderRepository.create({

                orderNumber: generateOrderNumber(),

                user: userId,

                items: cart.items.map(item => ({

                    product: item.product._id,

                    name: item.product.name,

                    sku: item.product.sku,

                    quantity: item.quantity,

                    price: item.price,

                    subtotal: item.subtotal

                })),

                totalItems: cart.totalItems,

                subtotal: cart.subtotal,

                discount: cart.discount,

                tax: cart.tax,

                shipping: cart.shipping,

                grandTotal: cart.grandTotal,

                paymentMethod: dto.paymentMethod,

                shippingAddress: dto.shippingAddress

            });

            /**
             * 4. Deduct Inventory
             */

            for (const item of cart.items) {

                await this.productRepository.decreaseStock(

                    item.product._id.toString(),

                    item.quantity
                );

            }

            /**
             * 5. Clear Cart
             */

            cart.items = [] as any;

            cart.totalItems = 0;

            cart.subtotal = 0;

            cart.discount = 0;

            cart.tax = 0;

            cart.shipping = 0;

            cart.grandTotal = 0;

            await this.cartRepository.save(
                cart
            );

            /**
             * 6. Commit Transaction
             */

           // await session.commitTransaction();

            return order;

        } catch (error) {

            //await session.abortTransaction();

            throw error;

        } finally {

           // await session.endSession();

        }

    }

}