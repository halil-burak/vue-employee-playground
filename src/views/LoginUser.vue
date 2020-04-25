<template>
  <div id="login-user-form">
    <form @submit.prevent="login">
      <p>
        <label for="email">Email:</label>
        <input id="email" type="text" v-model="email" required />
      </p>

      <p>
        <label for="password">Password:</label>
        <input id="password" type="text" v-model="password" required />
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({
            name: "Dashboard",
          });
        });
    },
  },
};
</script>

<style scoped></style>
