<template>
    <div>
        {{ accessToken }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
    name: "FoodView",
    data() {
        return {
            username: "",
            password: "",
            accessToken: store.state.loginStore.accessToken
        };
    },
    methods: {
        async login() {
            store.dispatch("login", {
                username: this.username,
                password: this.password,
            });
        },
        async logout() {
            store.dispatch("logout");
        },
    },
});
</script>


<style scoped>
.order-list-layout {
    justify-content: center;
    width: 700px;
}
</style>