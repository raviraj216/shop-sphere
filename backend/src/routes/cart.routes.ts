import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { addToCartSchema,updateCartItemSchema } from "../validators/cart.validator";


const router = Router();

const controller = new CartController();

router.get(

    "/",

    authenticate,

    controller.getCart

);

router.patch(
    "/items/:productId",
    authenticate,
    validate(updateCartItemSchema),
    controller.updateQuantity
);

router.delete(
    "/items/:productId",
    authenticate,
    controller.removeItem
);


router.delete(
    "/",
    authenticate,
    controller.clearCart
);

router.post(

    "/",

    authenticate,

    validate(addToCartSchema),

    controller.addToCart

);


export default router;