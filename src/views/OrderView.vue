<template>
    <div>
        <h2><strong>History View</strong></h2>
    </div>
    <div class="container order-list-layout mx-auto">
        <b-table striped hover :items="formattedOrderList" :fields="fields">
            <template #cell(check)="data">
                <!-- Use the id from `orderList` via `data.item.id` -->
                <router-link :to="{ name: 'orderDetail', query: { id: data.item.id } }">
                    <button class="">Check</button>
                </router-link>
            </template>
        </b-table>
        <div v-for="(order, index) in orderList" cols="12" md="6" :key="index"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as apiOrders from "@/api/orders";
import { Order, OrderTable } from "@/interfaces/Order";
import { formatDisplayDate } from "@/utils/formatDate";
import store from "@/store";
import { Message } from "@/interfaces/Message";
import { AxiosError } from "axios";

export default defineComponent({
    name: "FoodView",
    data(): any {
        return {
            fields: [
                { key: "id", label: "Order ID" },
                { key: "foodName", label: "Food Name" },
                { key: "status", label: "Status" },
                { key: "quantity", label: "Quantity" },
                { key: "formattedTotalPrice", label: "Total Price ($)" },
                { key: "createdAt", label: "createdAt" },
                { key: "check", label: "Check" }

            ],
            formattedOrderList: [] as OrderTable[],
            orderList: [
                // {
                //   id: 1,
                //   price: 200,
                //   name: "pizza",
                //   store: "pizza hut",
                //   description: "very tasty",
                // },
                // {
                //   id: 2,
                //   price: 500,
                //   name: "fired chiken",
                //   store: "KFC",
                //   description: "yammy",
                // },
                // {
                //   id: 3,
                //   price: 700,
                //   name: "sushi",
                //   store: "sushiro",
                //   description: "raw fish",
                // },
            ],
        };
    },
    components: {},
    mounted() {
        this.fetchOrderList();
    },

    methods: {
        showMessage({ type, msg }: Message): void {
            store.dispatch("addMsg", { msg, type })
        },
        async fetchOrderList() {
            try {
                const response = await apiOrders.getOrdersAll();
                const orders = response.data;

                orders.forEach((order: Order) => {
                    const { id, status, quantity, totalPrice, createdAt, food } = order
                    this.formattedOrderList.push({
                        id,
                        status,
                        foodName: food?.name || "food name",
                        quantity,
                        totalPrice,
                        formattedTotalPrice: totalPrice.toLocaleString(),
                        createdAt: formatDisplayDate(createdAt) || "no date",
                    });
                });
            } catch (error: unknown) {
                
                if (error instanceof AxiosError) {
                    if (error.response?.statusText) {
                        this.showMessage({ type: "error", msg: error.response?.statusText })
                        return
                    }

                    // Unknown Error
                    this.showMessage({ type: "error", msg: "Unknown Erorr" })
                    return

                }

            }
        },
    },
});
</script>


<style scoped>
.order-list-layout {
    justify-content: center;
    width: 900px;
}
</style>