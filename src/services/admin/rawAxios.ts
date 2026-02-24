import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:4000/api";

// Raw axios instance (cookie-based). Prefer using src/api/axios.api.ts unless you need a no-interceptor client.
const rawAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default rawAxios;
