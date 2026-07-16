export function orderConfirmationTemplate(
  customerName: string,
  orderId: string,
  total: number
): string {
  return `
    <h1>Order Confirmation</h1>
    <p>Hello ${customerName},</p>
    <p>Your order ${orderId} has been confirmed.</p>
    <p>Total: ${total}</p>
  `;
}