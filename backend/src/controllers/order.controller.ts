import { Request, Response } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { ApiResponse } from "../utils/api-response";
import { OrderService } from "../services/order.service";

export class OrderController {

    private orderService = new OrderService();

    checkout = asyncHandler( async (req: Request, res: Response) => {
        const order = await this.orderService.checkout(
            req.user!.userId,
            req.body
            );

            return res.status(201).json(
                ApiResponse.success(
                    order,
                    "Order created successfully"
                )
            );

        }
    );

}