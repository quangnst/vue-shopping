import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const states = () => ({
  status: "",
  token: localStorage.getItem("token") || "",
  user: {},
});
const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  },
};
const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: "http://localhost:3000/register",
        data: user,
        method: "POST",
      })
        .then((resp) => {
          let token = resp.data.token;
          let user = resp.data.user;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);

          console.log("auth_success", token + user);
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: "http://localhost:3000/register",
        data: user,
        method: "POST",
      })
        .then((resp) => {
            console.log("auth_success", resp.data);
          let token = resp.data.token;
          let user = resp.data;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
          
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
};
const getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
};

export default {
  state: states(),
  mutations,
  actions,
  getters,
};
