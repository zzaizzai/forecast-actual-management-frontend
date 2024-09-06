<template>
    <div>
        <h2>
            <strong>Food List View</strong>

            <!-- Add Food Button -->
            <b-button variant="primary" class="plus-button mx-4" href="/foodadd">+</b-button>
        </h2>
    </div>

    <!-- Search Bar -->
    <div>
        <input type="text" v-model="searchKeyword" @keyup.enter="searchFoods">
        <button>Search</button>
    </div>


    <!-- Food Card List -->
    <div class="food-list-layout mx-auto">
        <b-row class="">
            <b-col v-for="food in foodList" cols="12" md="6" :key="food.id">
                <FoodCard :food="food" class="mx-1 my-1"></FoodCard>
            </b-col>
        </b-row>
    </div>


    <!-- More Foods Button -->

    <!-- InActive -->
    <b-button v-if="hasNoMoreFoods" disabled>
        <span>No More</span>
    </b-button>

    <!-- Loading -->
    <b-button v-else-if="showMoreButtonSpinner" disabled>
        <b-spinner small></b-spinner>
        <span>Getting More</span>
    </b-button>

    <!--Default Button  -->
    <b-button v-else @click="fetchMoreFoodList">
        <span>Get More</span>
    </b-button>


    {{ foodOldestId }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FoodCard from "@/components/FoodCard.vue"; // @ is an alias to /src
import * as apiFoods from "@/api/foods";
import { Food } from "@/interfaces/Food";
import { sleep } from "@/utils/times";
import { AxiosError } from "axios";
import store from "@/store";
import { Message } from "@/interfaces/Message";

export default defineComponent({
    name: "FoodView",
    data() {
        return {
            foodOldestId: -1,
            foodList: [
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
            ] as Food[],
            searchKeyword: "" as string,
            showMoreButtonSpinner: false,
            hasNoMoreFoods: false
        };
    },
    components: { FoodCard },
    mounted() {
        this.fetchInitFoodList();
    },
    methods: {
        showMessage({ type, msg }: Message): void {
            store.dispatch("addMsg", { msg, type })
        },
        async searchFoods() {
            const SEARCH_RESULTS_NUMBERS = 20

            // no search key
            if (this.searchKeyword === "") {
                this.fetchInitFoodList()
                return
            }

            // reset
            this.foodOldestId = -1

            const res = await apiFoods.getFoodsWithSearchKey(SEARCH_RESULTS_NUMBERS, this.foodOldestId, this.searchKeyword)
            const foods = res.data
            this.foodList = foods

        },
        async fetchInitFoodList() {
            try {
                const response = await apiFoods.getFoods(6, this.foodOldestId);
                const foods = response.data;
                this.foodList = foods;

                let minValueId = -1;
                for (let food of foods) {
                    if (minValueId < 0) {
                        minValueId = food.id;
                        continue;
                    }
                    if (minValueId < food.id) {
                        continue;
                    }
                    minValueId = food.id;
                }
                this.foodOldestId = minValueId;
            } catch (error) {

                if (error instanceof AxiosError) {

                    if (error.response?.statusText) {
                        this.showMessage({ type: "error", msg: error.response?.statusText })
                        return
                    }

                    // Unknown Error
                    this.showMessage({ type: "error", msg: "Unknown Error!" })
                    return

                }
            }
        },

        async fetchMoreFoodList() {

            // no more data
            // DeActive Get More Button
            if (this.foodOldestId < 0) {
                this.hasNoMoreFoods = true
                return;
            }

            this.showMoreButtonSpinner = true

            try {
                await sleep(0.5)
                const response = await apiFoods.getFoods(6, this.foodOldestId);
                const moreFoods: Food[] = response.data;

                this.foodList = [...this.foodList, ...moreFoods];

                let minValueId = -1;
                for (let food of moreFoods) {
                    if (minValueId < 0) {
                        minValueId = food.id;
                        continue;
                    }
                    if (minValueId < food.id) {
                        continue;
                    }
                    minValueId = food.id;
                }
                this.foodOldestId = minValueId;

                // no more data
                // DeActive Get More Button
                if (this.foodOldestId < 0) {
                    this.hasNoMoreFoods = true
                }

            } catch (error) {
                console.log(error);
            } finally {
                this.showMoreButtonSpinner = false
            }
        },
    },
});
</script>


<style scoped>
.plus-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #3498db;
    border-radius: 50%;
    font-size: 24px;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;
}

.plus-button:hover {
    background-color: #2980b9;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.plus-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5);
}

.food-list-layout {
    justify-content: center;
    width: 700px;
}

@media (max-width: 800px) {
    .food-list-layout {
        width: 350px;
    }
}
</style>