import { AxiosResponse } from 'axios'
import http from './http'
import { Food, FoodCreateDto } from "@/interfaces/Food"

export async function getFoods(take: number, lastId: number): Promise<AxiosResponse<Food[]>> {
    return http.get(`/foods/getSome?take=${take}&lastId=${lastId}`)
}

export async function getFoodsWithSearchKey(take: number, lastId: number, searchKey: string): Promise<AxiosResponse<Food[]>> {
    return http.get(`/foods/getSomeWithSearchKey?take=${take}&lastId=${lastId}&searchKey=${searchKey}`)
}

export async function getOneFood(foodId: number): Promise<AxiosResponse<Food>> {
    return http.get(`/foods/getone/${foodId}`)
}

export async function addFood(foodCreateDto: FoodCreateDto): Promise<AxiosResponse<Food>> {
    return http.post(`/foods/add`, foodCreateDto)
}

export async function updateOneFood(food: Food): Promise<AxiosResponse<Food>>  {
    return http.patch(`/foods/${food.id}`, food)
}

export async function deleteOneFood(food: Food): Promise<AxiosResponse<void>>  {
    return http.delete(`/foods/${food.id}`)

}