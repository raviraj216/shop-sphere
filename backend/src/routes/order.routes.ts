import { Router } from "express";
import { checkoutSchema } from "../validators/order.validator";
import { OrderController } from "../controllers/order.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";


const router = Router();

const controller = new OrderController();

router.post(

    "/checkout",

    authenticate,

    validate(checkoutSchema),

    controller.checkout

);

export default router;