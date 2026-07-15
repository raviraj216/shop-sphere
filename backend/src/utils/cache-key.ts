export const CacheKeys = {

    products: "products",
    searchProducts: (search: string) => `products:search:${search.toLowerCase()}`,

    product: (id: string) => `product:${id}`,

    categories: "categories",

    category: (id: string) => `category:${id}`,

    cart: (userId: string) => `cart:${userId}`,

    user: (userId: string) => `user:${userId}`,

    orders: (userId: string) => `orders:${userId}`,

    dashboard: "dashboard",
    refreshToken: ( userId: string, deviceId: string ) => `refresh:${userId}:${deviceId}`,
    rateLimit: (prefix: string,identifier: string) => `rate-limit:${prefix}:${identifier}`
};