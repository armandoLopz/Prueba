export interface ProductsApiResponse {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface Rating {
    rate: number;
    count: number;
}

export interface ProductsWithBs {
    id: number;
    title: string;
    priceUSD: number;
    priceVES: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}
