import axios from "axios";

const AUTH_BASE = import.meta.env.VITE_AUTH_API_BASE as string;
const DATA_BASE = import.meta.env.VITE_DATA_API_BASE as string;
const TOKEN_MODE = (import.meta.env.VITE_AUTH_TOKEN_MODE as "cookie" | "bearer") ?? "bearer";

export const authHttp = axios.create({
  baseURL: AUTH_BASE,
  withCredentials: TOKEN_MODE === "cookie"
});

export const dataHttp = axios.create({
  baseURL: DATA_BASE,
  withCredentials: TOKEN_MODE === "cookie"
});

// Attach bearer token if we store it client-side
export const attachToken = (getToken: () => string | null) => {
  [authHttp, dataHttp].forEach((inst) => {
    inst.interceptors.request.use((config) => {
      if (TOKEN_MODE === "bearer") {
        const t = getToken();
        if (t) config.headers.Authorization = `Bearer ${t}`;
      }
      return config;
    });
  });
};
