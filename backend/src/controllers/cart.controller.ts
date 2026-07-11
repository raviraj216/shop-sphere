import { CartService } from "../services/cart.service";
import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";
import { ProductParams } from "../types/cart.types";

const service = new CartService();

export class CartController {

    getCart = asyncHandler(async (req, res) => {

        const cart = await service.getCart(
             req.user!.userId
        );

        return res.json(
            ApiResponse.success(cart)
        );

    });

    addToCart = asyncHandler(async (req, res) => {

        const cart = await service.addToCart(
            req.user!.userId,
            req.body.productId,
            req.body.quantity
        );

        return res.status(200).json(
            ApiResponse.success(
                cart,
                "Product added to cart"
            )
        );

    });


    updateQuantity = asyncHandler(async (req , res) => {

        const cart = await service.updateQuantity(
            req.user!.userId,
            req.params.productId as string,
            req.body.quantity
        );

        return res.json(
            ApiResponse.success(
                cart,
                "Quantity updated successfully"
            )
        );

    });

    removeItem = asyncHandler(async (req, res) => {

        const cart = await service.removeItem(
            req.user!.userId,
            req.params.productId
        );

        return res.json(
            ApiResponse.success(
                cart,
                "Item removed successfully"
            )
        );

    });

    clearCart = asyncHandler(async (req, res) => {

        const cart = await service.clearCart(
            req.user!.userId
        );

        return res.json(
            ApiResponse.success(
                cart,
                "Cart cleared successfully"
            )
        );

    });
}