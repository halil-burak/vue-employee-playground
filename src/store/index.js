import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: [],
  },
  getters: {
    employeeCount(state) {
      return state.employees.length;
    },
    employeeList(state) {
      return state.employees;
    },
  },
  mutations: {
    addToEmployees(state, employee) {
      console.log("inside mutations");
      const lastId =
        state.employees.length > 0
          ? state.employees[state.employees.length - 1].id
          : 0;
      const id = lastId + 1;
      state.employees.push({
        id: id,
        name: employee.name,
        lastname: employee.lastname,
        email: employee.email,
      });
    },
  },
  actions: {
    addEmployee({ commit }, employee) {
      console.log("inside actions");
      if (employee) {
        commit("addToEmployees", employee);
      }
    },
  },
});
