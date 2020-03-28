<template>
  <div id="app" class="small-container">
    <h1>Employees</h1>

    <employee-form @add-employee="postEmployee"></employee-form>
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
      employees: []
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
    /*deleteEmployee(id) {
      this.employees = this.employees.filter(employee => employee.id !== id);
    },*/
    async getEmployees() {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        let data = await response.json();
        this.employees = data;
      } catch (error) {
        console.log(error);
      }
    },
    async postEmployee(employee) {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            body: JSON.stringify(employee),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          }
        );
        let data = await response.json();
        this.employees.push(data);
      } catch (error) {
        console.log(error);
      }
    },
    async editEmployee(id, updatedEmployee) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedEmployee),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          }
        );
        const data = await response.json();
        this.employees = this.employees.map(employee =>
          employee.id === id ? data : employee
        );
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEmployee(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "DELETE"
        });
        this.employees = this.employees.filter(employee => employee.id !== id);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getEmployees();
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
