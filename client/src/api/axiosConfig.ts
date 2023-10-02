import axios from "axios";
import { BASE_URL } from "./api";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // cookies included with requests
  // timeout: 10000, // 10 seconds in milliseconds
});

// attach the token to the request headers
const token = localStorage.getItem("userToken");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
