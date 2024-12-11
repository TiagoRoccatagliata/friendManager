import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000/api" // Backend en desarrollo
    : "/api"; // Backend en producción

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;