import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL
});

// TODO: Create 401 and 403 response interceptors

export default instance;
