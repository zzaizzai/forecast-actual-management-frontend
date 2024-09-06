<template>
    <b-row>
        <div>
            <h3>
                Sign Up Page
            </h3>
        </div>
    </b-row>

    <b-row class="justify-content-center">
        <b-col sm="2"><label><strong>user name</strong></label></b-col>
        <b-col sm="4"><b-form-input placeholder="username" type="text" v-model="signUpData.username" /></b-col>
    </b-row>

    <b-row class="justify-content-center">
        <b-col sm="2"><label><strong>password</strong></label></b-col>
        <b-col sm="4"><b-form-input placeholder="password" type="text" v-model="signUpData.password" /></b-col>
    </b-row>

    <b-row class="justify-content-center">
        <b-col sm="2"><label><strong>password check</strong></label></b-col>
        <b-col sm="4"><b-form-input placeholder="password check" type="text"
                v-model="signUpData.passwordCheck" /></b-col>
    </b-row>

    <b-row><b-col><b-button variant="success" @click="signUp">Sign Up</b-button></b-col></b-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { SignUpInfo } from "@/interfaces/Auth";
import { Message } from "@/interfaces/Message";
import { AxiosError, AxiosResponse } from "axios";

export default defineComponent({
    name: "SignUpView",
    data(): any {
        return {
            signUpData: {
                username: "",
                password: "",
                passwordCheck: ""
            } as SignUpInfo

        };
    },
    components: {},
    methods: {
        showMessage({ type, msg }: Message): void {
            store.dispatch("addMsg", { msg, type })
        },
        async signUp(): Promise<void> {

            if (this.signUpData.username?.length < 4) {
                this.showMessage({ type: "error", msg: "More than 3 characters" })
                return
            }

            if (this.signUpData.password !== this.signUpData.passwordCheck) {
                this.showMessage({ type: "error", msg: "password check error" })
                return
            }

            try {
                const { username, password }: SignUpInfo = this.signUpData
                const res: AxiosResponse<any> = await store.dispatch("signup", { username, password });

                // Created!
                if (res.status === 201) {
                    this.showMessage({ type: "success", msg: "User Created!" })
                }

            } catch (error: unknown) {
                if (error instanceof AxiosError) {

                    // Conflict!
                    if (error.response?.status === 409) {
                        this.showMessage({ type: "error", msg: "User Name Alerady Exists" })
                        return
                    }

                    // Somthing Bad Request!
                    if (error.response?.status === 400) {
                        this.showMessage({ type: "error", msg: "Bad Request!" })
                        return
                    }

                    // Unknwon Error!
                    this.showMessage({type:"error", msg:"Unknown Error!"})
                }
            }

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