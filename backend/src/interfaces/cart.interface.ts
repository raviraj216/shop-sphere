export interface ICartItem {
    product: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface ICart {
    user: string;
    items: ICartItem[];
    total: number;
}