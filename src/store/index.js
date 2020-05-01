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
      console.log("inside addToEmployees mutation");
      const lastId =
        state.employees.length > 0
          ? state.employees[state.employees.length - 1].id
          : 0;
      const id = lastId + 1;
      employee.id = id;
      state.employees.push(employee);
    },
    editOneEmployee(state, employee_) {
      const employee = state.employees.find((item) => item.id === employee_.id);
      employee.name = employee_.name;
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
    async addEmployee({ commit }, employee) {
      console.log("inside addEmployee action");
      if (employee) {
        try {
          let response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
            {
              method: "POST",
              body: JSON.stringify(employee),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }
          );
          let data = await response.json();
          commit("addToEmployees", data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async editEmployee({ commit }, employee) {
      console.log("inside edit employee action");
      if (employee) {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${employee.id}`,
            {
              method: "PUT",
              body: JSON.stringify(employee),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }
          );
          const data = await response.json();
          commit("editOneEmployee", data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    async removeEmployee({ commit }, id) {
      console.log("inside removeEmployee action");
      if (id) {
        try {
          await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
          });
          commit("removeOneEmployee", id);
        } catch (error) {
          console.error(error);
        }
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
