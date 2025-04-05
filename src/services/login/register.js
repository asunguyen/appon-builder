import api from "../api.js";

export default {
  register(data) {
    return api().post("/auth/sign-up", data);
  }
};
