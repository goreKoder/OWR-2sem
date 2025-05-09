import axios from "axios";
const HOST = String(import.meta.env.VITE_HOST);
const apiServer = axios.create({
  timeout: 1000, 
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiServer;
