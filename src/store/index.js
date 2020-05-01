import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: [],
    user: null,
  },
  getters: {
    employeeCount(state) {
      return state.employees.length;
    },
    employeeList(state) {
      return state.employees;
    },
    loggedIn(state) {
      return !!state.user;
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
    editOneEmployee(state, employee_) {
      const employee = state.employees.find((item) => item.id === employee_.id);
      employee.name = employee_.name;
      employee.lastname = employee_.lastname;
      employee.email = employee_.email;
    },
    removeOneEmployee(state, id) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== id
      );
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] =
        "Bearer ${userData.token}";
    },
    LOG_OUT() {
      localStorage.removeItem("user");
      location.reload();
    },
    fetchEmployees(state, data) {
      console.log("inserting employees...");
      state.employees = data;
      console.log("inserted employees.");
    },
  },
  actions: {
    async getEmployees({ commit }) {
      console.log("fetching employees...");
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        let data = await response.json();
        commit("fetchEmployees", data);
      } catch (error) {
        console.log(error);
      }
    },
    addEmployee({ commit }, employee) {
      console.log("inside actions");
      if (employee) {
        commit("addToEmployees", employee);
      }
    },
    editEmployee({ commit }, employee) {
      console.log("inside edit employee action");
      if (employee) {
        commit("editOneEmployee", employee);
      }
    },
    removeEmployee({ commit }, id) {
      console.log("inside remove employee action");
      if (id) {
        commit("removeOneEmployee", id);
      }
    },
    register({ commit }, credentials) {
      return axios
        .post("//localhost:3000/register", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    login({ commit }, credentials) {
      return axios
        .post("//localhost:3000/login", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("LOG_OUT");
    },
  },
});
