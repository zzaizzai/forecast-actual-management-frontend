import { Food } from "./Food"

interface OrderBase {
    id: number
    status: string
    quantity: number
    totalPrice: number
}

export interface Order extends OrderBase {
    food: Food
    createdAt: Date
}

export interface OrderTable extends OrderBase {
    foodName: string
    createdAt: string
    formattedTotalPrice: string
}

export interface OrderCreateDto {
    foodId: number
    quantity: number
    totalPrice: number
}