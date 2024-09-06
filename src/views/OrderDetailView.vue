<template>
    <div>

        <h2>Order Detail View</h2>
        <b-container>
        <b-row>
            id: {{ orderData.id }}
        </b-row>
        <b-row>
            status: {{ orderData.status }}
        </b-row>
        <b-row>
            quantity: {{ orderData.quantity }}
        </b-row>
        <b-row>
            total price: {{ orderData.totalPrice }}
        </b-row>
        <b-row>
            created at: {{ orderData.createdAt }}
        </b-row>
        <b-row>
            formatted price: {{ formattedPrice }}
        </b-row>

        <b-row>
        formatted created at: {{ formattedCreatedAt }}
        </b-row>
        </b-container>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { Message } from "@/interfaces/Message";
import { Order } from "@/interfaces/Order";
import * as apiOrder from "@/api/orders"
import { AxiosResponse } from "axios";
import { LocationQueryValue, useRoute } from "vue-router";
import { formatDisplayDate } from "@/utils/formatDate";


export default defineComponent({
    name: "OrderDetailView",
    data(): any {
        return {
            orderData: {} as Order
        };
    },
    components: {},
    mounted() {
        this.getOrderData()
    },

    methods: {
        showMessage({ type, msg }: Message): void {
            store.dispatch("addMsg", { msg, type })
        },

        async getOrderData(): Promise<void> {
            const route = useRoute();
            const orderIdValue: LocationQueryValue | LocationQueryValue[] = route.query.id

            let orderIdStr: string | null = null;
            if (Array.isArray(orderIdValue)) {
                orderIdStr = orderIdValue[0]
            } else {
                orderIdStr = orderIdValue
            }
            const orderIdInt = isNaN(Number(orderIdStr)) ? null : Number(orderIdStr)

            if (orderIdInt) {
                const order: AxiosResponse<Order, any> = await apiOrder.getOrderOne(orderIdInt)

                if (order.data?.id) {
                    this.orderData = order.data
                    console.log(order.data)
                } else {
                    this.showMessage({ type: "error", msg: "No Order Data!" })
                }
            } else {
                this.showMessage({ type: "error", msg: "Invalid method!" })
            }

        }
    },
    computed: {
        formattedPrice(): string {
            if (this.orderData?.totalPrice) {
                return this.orderData.totalPrice.toLocaleString();
            }
            return ""
        },
        formattedCreatedAt(): string {
            return formatDisplayDate(this.orderData?.createdAt) || "no date"
        }
    }
});
</script>


<style scoped>
.order-list-layout {
    justify-content: center;
    width: 900px;
}
</style>