<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/foods">Foods</router-link> |
    <router-link to="/orders">Orders</router-link>
  </nav>
  <!-- Alert Messages -->
  <div v-for="msg in msgList" :key="msg">
    <AlertBar :message="msg"></AlertBar>
  </div>

  <!-- <button @click="clearMsg">test clear</button> -->
  <!-- <button @click="addMsg">test Add</button> -->
  <router-view />
</template>

<script lang="ts">
import AlertBar from "./components/AlertBar.vue";
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  components: { AlertBar },
  data() {
    return {
      msg: "msgaa"
    }
  },
  computed: {
    msgList() {
      return store.getters.getMsgList;
    },
    isLoggedIn() {
      return store.getters.isAuthenticated;
    }
    ,
    usernameLoggedIn() {
      return store.getters.getUsername
    }

  },
  methods: {
    clearMsg() {
      store.dispatch('clearMsg')
    },
    addMsg() {
      store.dispatch('addMsg', { type: "test", msg: "good" })
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
