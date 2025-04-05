import { COMMON } from "../../constants/common.js";

import axios from "axios"

const DEFAULT_API = COMMON.APIURL;

const DEFAULT_HEADER = {
    Authorization: localStorage.getItem('Authorization')
}
const DEFAULT_CONFIG = {
    baseURL: DEFAULT_API,
    headers: DEFAULT_HEADER
}
const API = axios.create(DEFAULT_CONFIG)

export default API