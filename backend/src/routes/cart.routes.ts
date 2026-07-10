import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { addToCartSchema } from "../validators/cart.validator";


const router = Router();

const controller = new CartController();

router.get(

    "/",

    authenticate,

    controller.getCart

);

router.post(

    "/",

    authenticate,

    validate(addToCartSchema),

    controller.addToCart

);


export default router;