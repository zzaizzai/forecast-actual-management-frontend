import { Module } from 'vuex'
import * as authApi from "@/api/auth";
import store, { RootState } from '.';
import { AxiosError, AxiosResponse } from 'axios';
import { LogInInfo } from '@/interfaces/Auth';


export type AuthState = {
    accessToken: string | null;
    username: string | null;
};


const loginStore: Module<AuthState, RootState> = {
    state: {
        accessToken: null,
        username: null
    },
    getters: {
        isAuthenticated(state): boolean {
            return state.accessToken !== null;
        },
        getUsername(state): string | null {
            return state.username
        }
    },
    mutations: {
        setToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setUsername(state, username) {
            state.username = username
        },
        clearToken(state) {
            state.accessToken = null;
        },
        clearUsername(state) {
            state.username = null;
        }
    },
    actions: {
        // Consider creating a separate login action for reusability
        async login({ commit }, { username, password }: LogInInfo) {
            try {
                const response = await authApi.login(username, password);
                const accessToken = response.data.accessToken;
                console.log("accessToken:", accessToken)
                commit('setToken', accessToken);
                commit('setUsername', username);
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    throw error
                }
            }
        },
        logout({ commit }): void {
            commit('clearToken');
            commit('clearUsername');
            console.log('clear token')
            console.log('clear Username')
        },
        signup({ commit }, { username, password }: LogInInfo): Promise<AxiosResponse<any, any>> {
            return authApi.signup(username, password)
        },
        async checkToken({ commit }): Promise<void> {

            try {
                const response = await authApi.checkToken();
                console.log("check token", response.status)

                // Token is OK
                if (response.status == 200) {
                    return
                }
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    console.log(error.response)

                    // Token is expired
                    if (error.response?.status === 401) {
                        commit("clearToken")
                        commit("clearUsername")
                    }
                }
            }
        }
    },
    modules: {
    }
}

export default loginStore