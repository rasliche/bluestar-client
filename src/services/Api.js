import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// instance.interceptors.response.use

// TODO: Create 401 and 403 response interceptors... in Vuex/store?

export default instance
