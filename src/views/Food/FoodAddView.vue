<template>
    <b-container>
        <b-row>
            <div>Food Add View</div>
        </b-row>

        <b-row class="justify-content-center">
            <b-col sm="2"><label><strong>name</strong></label></b-col>
            <b-col sm="5"><b-form-input placeholder="Food Name" type="text" v-model="foodname" /></b-col>
        </b-row>

        <b-row class="justify-content-center">
            <b-col sm="2"><label><strong>store</strong></label></b-col><b-col sm="5"><b-form-input
                    placeholder="Store Name" type="text" v-model="store" /></b-col>
        </b-row>

        <b-row class="justify-content-center">
            <b-col sm="2"><label><strong>price</strong></label></b-col>
            <b-col sm="5"><b-form-input placeholder="Price" type="number" v-model="price" /></b-col>
        </b-row>

        <b-row class="justify-content-center">
            <b-col sm="2"><label><strong>category</strong></label></b-col>
            <b-col sm="5"><b-form-input placeholder="Category" type="text" v-model="category" /></b-col>
        </b-row>

        <b-row class="justify-content-center"><b-col><b-button class="button-color-transition" :variant="buttonVariant"
                    @click="addFodd">{{ buttonText }}</b-button></b-col></b-row>
    </b-container>
    <strong>{{ msg }}</strong>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import * as foodApi from "@/api/foods";
import { FoodCreateDto } from "@/interfaces/Food";
import { sleep } from "@/utils/times";

export default defineComponent({
    name: "FoodAddView",
    data() {
        return {
            isAdding: false,
            msg: "",
            store: "",
            foodname: "",
            category: "",
            price: 0,
        };
    },
    methods: {
        resetAllInput(): void {
            this.foodname = ""
            this.store = ""
            this.category = ""
            this.price = 0
        },

        async addFodd(): Promise<void> {
            // reset message
            this.msg = "";
            this.isAdding = false;

            // check
            if (this.store === "" || this.foodname === "" || this.category === "") {
                this.msg = "input error";
                return;
            }

            const newFood: FoodCreateDto = {
                name: this.foodname,
                store: this.store,
                category: this.category,
                price: this.price,
                description: "",
            };
            this.isAdding = true;

            try {
                const result = await foodApi.addFood(newFood);
                console.log(result);

            } catch (error) {
                console.log("Error", error);
            }

            // Effect
            await sleep(2)

            this.isAdding = false;
            this.msg = "Added a new Food successfully.";
            this.resetAllInput()

        },
    },
    computed: {
        buttonVariant(): string {
            return this.isAdding ? "warning" : "success";
        },
        buttonText(): string {
            return this.isAdding ? "Adding" : "Add";
        },
    },
});
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
