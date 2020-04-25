<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link>
      <router-link v-else to="/login">Login</router-link>
      <button v-if="loggedIn" type="button" @click="logout">Log out</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { authComputed } from "./store/helpers.js";
export default {
  computed: {
    ...authComputed,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
