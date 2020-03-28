<template>
  <div id="app" class="small-container">
    <h1>Employees</h1>

    <employee-form @add-employee="addEmployee"></employee-form>
    <employee-table
      :employees="employees"
      @delete-employee="deleteEmployee"
      @edit-employee="editEmployee"
    ></employee-table>
  </div>
</template>

<script>
import EmployeeTable from "@/components/EmployeeTable.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";

export default {
  name: "App",
  components: {
    EmployeeTable,
    EmployeeForm
  },
  data() {
    return {
      employees: [
        {
          id: 1,
          name: "Ali",
          lastname: "Kaya",
          email: "ali@example.com"
        },
        {
          id: 2,
          name: "Veli",
          lastname: "Kirkdokuzelli",
          email: "veli@example.com"
        }
      ]
    };
  },
  methods: {
    addEmployee(_employee) {
      const lastId =
        this.employees.length > 0
          ? this.employees[this.employees.length - 1].id
          : 0;
      const id = lastId + 1;
      _employee.id = id;
      this.employees.push(_employee);
    },
    /* eslint-disable */
    deleteEmployee(id) {
      this.employees = this.employees.filter(employee => employee.id !== id);
    },
    editEmployee(id, updatedEmployee) {}
  }
};
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 680px;
}
</style>
