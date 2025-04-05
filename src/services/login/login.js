import api from "../api.js";

export default {
  login(data) {
    return api().post("auth/sign-in", data);
  }
  // fbLogin(data) {
  //   return api().post('/auth/fb-sign-in', data)
  // }
};
