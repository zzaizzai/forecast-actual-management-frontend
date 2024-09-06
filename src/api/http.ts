import axios from "axios";
import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;
console.log("API URL: ", apiUrl);

const instance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

// jwt Token
instance.interceptors.request.use(config => {
    const token = store.state.loginStore.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;

