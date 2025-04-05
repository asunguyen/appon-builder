import axios from "axios";
import { COMMON } from "../constants/common.js";
export default () => {
  return axios.create({
    baseURL: COMMON.APIURL
  });
};
