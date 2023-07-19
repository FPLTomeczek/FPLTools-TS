import axios from "axios";

import { config } from "./envConfig";

export const axiosInstance = axios.create({
  baseURL: config.url,
});
