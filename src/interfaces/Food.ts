export interface Food {
    id: number;
    name: string;
    price: number;
    description: string;
    store: string;
    createdAt: string;
    category: string;
}

export interface FoodCreateDto {
    name: string
    price: number
    category: string
    description: string
    store: string
}