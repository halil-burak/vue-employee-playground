<template>
  <div id="employee-table">
    <p v-if="employeeCount <= 0">No employees</p>
    <table v-else>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="employee.id">
          <td v-if="editing === employee.id">
            <input type="text" v-model="employee.name" />
          </td>
          <td v-else>{{ fullname(index) }}</td>

          <td v-if="editing === employee.id">
            <input type="text" v-model="employee.email" />
          </td>
          <td v-else>{{ employee.email }}</td>
          <td v-if="editing === employee.id">
            <button @click="editEmployee(employee)">Save</button>
            <button class="muted-button" @click="editing = null">Cancel</button>
          </td>
          <td v-else>
            <button @click="removeEmployee(employee.id)">
              Delete
            </button>
            <button @click="editMode(employee.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "employee-table",
  data() {
    return {
      editing: null,
    };
  },
  computed: {
    employees() {
      return this.$store.getters.employeeList;
    },
    employeeCount() {
      return this.$store.getters.employeeCount;
    },
  },
  methods: {
    fullname: function(index) {
      return this.employees[index].name + " " + this.employees[index].lastname;
    },
    editMode(id) {
      this.editing = id;
    },
    editEmployee(employee) {
      console.log("editing employee id:", employee.id);
      this.$store.dispatch("editEmployee", employee);
      this.editing = null;
    },
    removeEmployee(id) {
      console.log("removing employee id:", id);
      this.$store.dispatch("removeEmployee", id);
    },
  },
};
</script>

<style scoped>
button {
  margin: 0 0.5rem 0 0;
}
</style>
