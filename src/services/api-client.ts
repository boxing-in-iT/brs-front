import axios from "axios";
import { addAccessToken, updateAccessToken } from "./interceptors";
// import axiosRetry from "axios-retry";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:3000/",
  // baseURL: "https://nestjs-brs-back-production.up.railway.app/",
});

// const RETRY_COUNT = 3;
// axiosRetry(instance, {
//   retries: RETRY_COUNT,
//   retryDelay: (retryCount) => retryCount * 200, // time interval between retries,
//   retryCondition: (error) => Boolean(error),
// });

instance.interceptors.request.use(addAccessToken);
instance.interceptors.response.use((config) => config, updateAccessToken);
