export interface ProductQuery {

    page?: number;

    limit?: number;

    search?: string;

    category?: string;

    minPrice?: number;

    maxPrice?: number;

    sort?: string;

}