<template>
	<b-container>
		<b-row>
			<div>
				<h3>Food Edit View</h3>
			</div>
		</b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>name</strong></label></b-col>
			<b-col sm="5"><b-form-input placeholder="Food Name" type="text" v-model="foodData.name" /></b-col>
		</b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>store</strong></label></b-col><b-col sm="5"><b-form-input
					placeholder="Store Name" type="text" v-model="foodData.store" /></b-col>
		</b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>price</strong></label></b-col>
			<b-col sm="5"><b-form-input placeholder="Price" type="number" v-model="foodData.price" /></b-col></b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>category</strong></label></b-col>
			<b-col sm="5"><b-form-input placeholder="Category" type="text"
					v-model="foodData.category" /></b-col></b-row>

		<b-row class="justify-content-center">
			<b-col sm="2"><label><strong>description</strong></label></b-col>
			<b-col sm="5"><b-form-textarea placeholder="Description" type="text"
					v-model="foodData.description" /></b-col></b-row>

		<br>
		<br>

		<!-- Edit Button -->
		<b-row class="justify-content-center">
			<b-col sm="2">

				<!-- Loading -->
				<b-button v-if="showEditButtonSpinner" variant="success" @click="updateFood" disabled>
					<b-spinner small></b-spinner>
					<span>Apply</span>
				</b-button>

				<!-- Default Button -->
				<b-button v-else variant="success" @click="updateFood">Apply</b-button>

			</b-col>


			<!-- Delete Button -->
			<b-col sm="4">

				<!-- Loading -->
				<b-button v-if="showDeleteButtonSpinner" variant="danger" @click="deleteFood" disabled>
					<b-spinner small></b-spinner>
					<span>Delete</span>
				</b-button>

				<!-- Default Button -->
				<b-button v-else variant="danger" @click="deleteFood">
					<span>Delete</span>
				</b-button>

			</b-col>

		</b-row>

	</b-container>

	<!-- Messages -->
	<strong><span :class="msgVariant">{{ msg }}</span></strong>
</template>


<script lang="ts">
import { defineComponent, render } from "vue";
import * as foodApi from "@/api/foods";
import { Food, FoodCreateDto } from "@/interfaces/Food";
import store from "@/store";
import { sleep } from "@/utils/times";
import { AxiosResponse } from "axios";
import { Message } from "@/interfaces/Message";

export default defineComponent({
	name: "FoodAddView",
	data() {
		return {
			showEditButtonSpinner: false,
			showDeleteButtonSpinner: false,
			msg: "",
			isMsgError: false,
			foodId: "",
			foodData: {} as Food,
		};
	},
	async created() {
		this.foodId = String(this.$route.query.foodId);
		try {
			const result = await this.getFoodInformation(Number(this.foodId));
			const { data } = result;
			this.foodData = data
		} catch (error) {
			console.log(error);
			this.msg = "Failed to get Food Information";
		}
	},
	methods: {
		async deleteFood(): Promise<void> {
			// Chose to delete this or not
			if (confirm("Do you want to delete this food") == true) {
				// Delete this

				this.showDeleteButtonSpinner = true
				await sleep(2)
				this.showDeleteButtonSpinner = false

				try {
					const aa = await foodApi.deleteOneFood(this.foodData)
					this.$router.push('/food')
				} catch (error) {
					this.showMessage({ type: "error", msg: "Failed to Delete" })
					console.log(error)
				}
			} else {
				// Dont delete
				return;
			}
		},
		showMessage({ type, msg }: Message): void {
			store.dispatch("addMsg", { msg, type })
		},

		getFoodInformation(foodId: number): Promise<AxiosResponse<Food, any>> {
			return foodApi.getOneFood(foodId);
		},

		resetAllInput(): void {
			this.foodData.name = "";
			this.foodData.store = "";
			this.foodData.category = "";
			this.foodData.price = 0;
		},

		async updateFood(): Promise<void> {
			// reset message
			this.msg = "";
			this.showEditButtonSpinner = false;

			// check
			if (this.foodData.store === "" || this.foodData.name === "" || this.foodData.category === "") {
				this.msg = "input error";
				return;
			}

			const newFood: Food = {
				id: this.foodData.id,
				name: this.foodData.name,
				store: this.foodData.store,
				category: this.foodData.category,
				price: this.foodData.price,
				createdAt: this.foodData.createdAt,
				description: this.foodData.description
			};
			this.showEditButtonSpinner = true;

			try {
				const result = await foodApi.updateOneFood(newFood);
				console.log(result);

			} catch (error) {
				console.log("Error", error);
			}

			// Effect
			setTimeout(() => {
				this.showEditButtonSpinner = false;
				this.showMessage({ type: "success", msg: "Completed to Edit Post!" })
			}, 2000);
		},
	},
	computed: {
		msgVariant(): string {
			return this.isMsgError ? "msg-error" : "";
		},
	},
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg-error {
	color: red;
}
</style>
