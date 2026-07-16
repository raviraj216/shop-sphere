import { transporter } from "../config/mail";

import { orderConfirmationTemplate } from "../templates/order-confirmation";
 
export class EmailService {

    async sendOrderConfirmation(

        email: string,

        customerName: string,

        orderId: string,

        total: number

    ) {

        await transporter.sendMail({

            from: process.env.MAIL_FROM,

            to: email,

            subject:

                "Order Confirmation",

            html:

                orderConfirmationTemplate(

                    customerName,

                    orderId,

                    total

                )

        });

    }

}