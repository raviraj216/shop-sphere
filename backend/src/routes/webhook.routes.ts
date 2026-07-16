import { Router } from "express";

import * as controller from "../controllers/webhook.controller";

const router = Router();

router.post( "/stripe", controller.stripeWebhook);

export default router;