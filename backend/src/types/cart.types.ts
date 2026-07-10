export interface CartItem {

    product: string;

    quantity: number;

    price: number;

    subtotal: number;

}

export interface CartTotals {

    totalItems: number;

    subtotal: number;

    discount: number;

    tax: number;

    shipping: number;

    grandTotal: number;

}