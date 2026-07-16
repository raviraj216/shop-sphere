import { Router } from "express";

import * as controller from "../controllers/payment.controller";

const router = Router();

router.post("/intent", controller.createPaymentIntent);

export default router;