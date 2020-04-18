<template>
  <div id="employee-form">
    <form @submit.prevent="addEmployee">
      <p>
        <label for="name">Name:</label>
        <input
          ref="first"
          id="name"
          type="text"
          :class="{ 'has-error': submitting && invalidName }"
          v-model="name"
          @focus="clearStatus"
          @keypress="clearStatus"
          required
        />
      </p>

      <p>
        <label for="lastname">Last Name:</label>
        <input
          id="lastname"
          type="text"
          :class="{ 'has-error': submitting && invalidName }"
          v-model="lastname"
          @focus="clearStatus"
          @keypress="clearStatus"
          required
        />
      </p>

      <p>
        <label for="email">Email:</label>
        <input
          id="email"
          type="text"
          :class="{ 'has-error': submitting && invalidEmail }"
          v-model="email"
          @focus="clearStatus"
          @keypress="clearStatus"
          required
        />
      </p>

      <p v-if="submitting && error" class="error-message">
        Please enter valid information!
      </p>
      <p v-if="success" class="success-message">
        ✅ Employee successfully added
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "employee-form",
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      id: null,
      name: "",
      lastname: "",
      email: "",
    };
  },
  methods: {
    clearStatus() {
      this.success = false;
      this.error = false;
    },
    addEmployee() {
      this.submitting = true;
      this.clearStatus();

      if (this.invalidName || this.invalidEmail) {
        this.error = true;
        return;
      }

      let employee_ = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
      };

      this.$store.dispatch("addEmployee", employee_);
      this.$refs.first.focus();

      this.name = null;
      this.lastname = null;
      this.email = null;

      this.error = false;
      this.success = true;
      this.submitting = false;
    },
  },
  computed: {
    invalidName() {
      return this.name === "" || this.lastname === "";
    },
    invalidEmail() {
      return this.email === "" || !this.email.includes("@");
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}
[class*="-message"] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
</style>
