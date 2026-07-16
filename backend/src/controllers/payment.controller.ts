import { Request, Response } from "express";

import { asyncHandler } from "../middleware/async-handler";

import { PaymentService } from "../services/payment.service";

const service =
new PaymentService();

export const createPaymentIntent =
asyncHandler(

    async (

        req: Request,

        res: Response

    ) => {

        const result =
            await service.createPaymentIntent(

                req.body.orderId

            );

        res.status(200).json({

            success: true,

            data: result

        });

    }

);