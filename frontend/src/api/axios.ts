import axios from "axios";
const HOST = String(import.meta.env.VITE_HOST);
const apiServer = axios.create({
  timeout: 3000, // Время ожидания ответа после которого выводится ошибка
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiServer;
