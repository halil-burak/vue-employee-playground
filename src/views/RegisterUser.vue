<template>
  <div id="register-user-form">
    <form @submit.prevent="register">
      <p>
        <label for="name">Name:</label>
        <input ref="first" id="name" type="text" v-model="name" required />
      </p>

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
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
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
