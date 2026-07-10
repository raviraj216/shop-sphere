import { CartService } from "../services/cart.service";
import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";

const service = new CartService();

export class CartController {

    getCart = asyncHandler(async (req, res) => {

        const cart = await service.getOrCreateCart(
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

}