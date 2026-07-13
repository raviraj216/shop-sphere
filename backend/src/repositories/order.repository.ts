import { Order } from "../models/order.model";
import { ClientSession } from "mongoose";

export class OrderRepository {

    async create(
        data: any
        //,session: ClientSession
    ) {

        return Order.create(data);

        // const [order] = await Order.create(

        //     [data],

        //     {
        //        // session
        //     }

        // );

        // return order;

    }

    async findByUser(userId: string) {
        return Order.find({ user: userId })
            .populate("items.product")
            .sort({ createdAt: -1 });
    }

    async findById(id: string) {
        return Order.findById(id)
            .populate("items.product");
    }

}