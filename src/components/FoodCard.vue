<template>
    <div class="foodcard">
        <b-row>
            <b-col cols="10">
                <h4>
                    <strong>{{ food.name }}</strong>
                </h4>

            </b-col>
            <b-col cols="2"><a :href="`/foodedit?foodId=${food.id}`">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
                        <path
                            d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z" />
                        <path
                            d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z" />
                    </svg>

                </a></b-col>
            <!-- <b-col cols="2"><b-button pill>X</b-button> </b-col> -->
        </b-row>
        <b-container>

            <b-row><span><strong>Store:</strong>{{ food.store ?? "store" }}</span></b-row>

            <b-row class="food description-box">
                <b-col class="d-flex">
                    <div>
                        <strong class="me-2">
                            Description:
                        </strong>
                        <span>
                            {{ food.description ?? "Content Content Content Content Content Content Content Content Content Content Content"}}
                        </span>
                    </div>
                </b-col>
            </b-row>
            <b-row>

                <b-row>
                    <b-col>
                        <div class="image-container">
                            <img src="/images/foodAltImage.png" alt="">
                        </div>
                    </b-col>


                    <b-col class="px-0">

                        <div class="d-flex align-items-center">
                            <div>Qty.</div>
                            <b-form-input style="width: 48px" type="number" v-model="qty" />
                        </div>

                        <div >
                            <b-button variant="warning" @click="decrementQty">-</b-button>
                            <b-button variant="warning me-1" @click="incrementQty">+</b-button>
                        </div>

                        <div>
                            <b-button :variant="buttonVariant" class="button-color-transition" @click="orderFood">{{ buttonText }}</b-button>
                        </div>

                    </b-col>
                </b-row>

            </b-row>
            <b-row>
                <strong>Total Price: <span>{{ formattedTotalPrice }}</span>
                    <span> ({{ formattedPrice }})</span></strong></b-row>
            <span><strong class="msgCard">{{ msgCard }}</strong></span>
        </b-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Food } from "@/interfaces/Food";
import * as apiOrders from "@/api/orders";
import { sleep } from "@/utils/times";
import { OrderCreateDto } from "@/interfaces/Order";

export default defineComponent({
    name: "FoodCard",
    props: {
        msg: String,
        food: {
            type: Object as () => Food,
            required: true,
        },
    },
    data() {
        return {
            msgCard: "",
            qty: 1,
            isOrdering: false,
        };
    },
    methods: {
        incrementQty(): void {
            this.qty++;
        },
        decrementQty(): void {
            if (this.qty > 1) {
                this.qty--;
            }
        },
        async orderFood(): Promise<void> {
            this.msgCard = "";

            if (this.qty < 1) {
                this.msgCard = "Error !!!";
                return;
            }

            this.isOrdering = true;

            const orderCreateDto: OrderCreateDto = {
                foodId: this.food.id,
                quantity: this.qty,
                totalPrice: this.totalPrice,
            };

            try {
                const response = await apiOrders.addOne(orderCreateDto);
                console.log(response.data);
            } catch (error) {
                console.error("Error while sending order data:", error);
                this.msgCard = "Error !!!";

                await sleep(2)
                this.msgCard = ""
                this.isOrdering = false

                return;
            }

            await sleep(2)
            this.qty = 1;
            this.isOrdering = false;
            this.msgCard = "Done!!";

            await sleep(2)
            this.msgCard = "";
        },
    },
    computed: {
        buttonVariant(): string {
            return this.isOrdering ? "warning" : "success";
        },
        buttonText(): string {
            return this.isOrdering ? "Ordering" : "Order";
        },
        totalPrice(): number {
            return this.food.price * this.qty;
        },
        formattedTotalPrice(): string {
            return this.totalPrice.toLocaleString();
        },
        formattedPrice(): string {
            return this.food.price.toLocaleString();

        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* hide spin button */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


.food.description-box {
    height: 70px;
}

.image-container {
    width: 150px;
    /* Adjust this to your desired container width */
    height: 130px;
    /* Adjust this to your desired container height */
    overflow: hidden;
    /* This hides any part of the image that overflows the container */
}

.image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    /* Ensures the image scales while preserving its aspect ratio */
    border-radius: 20px;
    border: 3px solid #000;
}


.button-color-transition {
    transition: background-color 0.5s;
}

.msgCard {
    color: red;
}

.foodcard {
    padding: 5px;
    background: #eee;
    border-radius: 16px;
    height: 300px;
    width: 350px;
    transition: box-shadow 0.3s ease;
    /* Smooth transition for the shadow */
}

.foodcard:hover {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    /* Slight shadow effect on hover */
    background: #eee;

}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
