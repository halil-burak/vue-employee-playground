<template>
  <div>
    <EmployeeForm></EmployeeForm>
    <EmployeeTable></EmployeeTable>
  </div>
</template>

<script>
import EmployeeForm from "@/views/EmployeeForm.vue";
import EmployeeTable from "@/views/EmployeeTable.vue";
export default {
  components: {
    EmployeeForm,
    EmployeeTable,
  },
};
</script>

<style scoped>
button {
  background: #009435;
  border: 1px solid #009435;
}
.small-container {
  max-width: 680px;
}
</style>
