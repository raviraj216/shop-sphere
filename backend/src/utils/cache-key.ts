export const CacheKeys = {

    products: "products",

    product: (id: string) => `product:${id}`,

    categories: "categories",

    category: (id: string) => `category:${id}`,

    cart: (userId: string) => `cart:${userId}`,

    user: (userId: string) => `user:${userId}`,

    orders: (userId: string) => `orders:${userId}`,

    dashboard: "dashboard"

};