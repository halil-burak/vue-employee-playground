<template>
  <div class="home">
    <h1>Welcome to Employee Record Portal</h1>
    <template v-if="!loggedIn">
      <div>
        To use this app, you'll need to
        <router-link to="/login">Login</router-link>
        or
        <router-link to="/register">Register</router-link>
      </div>
    </template>
    <p v-else>
      You're successfully logged in. You may now go to the
      <router-link to="/dashboard">dashboard</router-link> and start your work!
    </p>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers.js";
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  computed: {
    ...authComputed,
  },
};
</script>
