import axios from 'axios'

const BASE_URL = "/api"

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
})

export default service