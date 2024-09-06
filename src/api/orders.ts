import { AxiosResponse } from 'axios'
import http from './http'
import { Order, OrderCreateDto } from '@/interfaces/Order'


export async function getOrdersAll(): Promise<AxiosResponse<Order[], any>> {
    return http.get('/orders/all')
}

export async function getOrderOne(id: number): Promise<AxiosResponse<Order, any>> {
    return http.get(`/orders/getOne?id=${id}`)
}

export async function addOne(orderCreateDto: OrderCreateDto): Promise<AxiosResponse<any, any>> {
    return http.post('/orders/addOne', orderCreateDto
    )

}
