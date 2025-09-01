import { authHttp } from "./http";

export type User = {
  id: string;
  email: string;
  name?: string;
  role: "evaluator" | "evaluated";
};

export type AuthMe = { user: User };

export const getMe = async (): Promise<AuthMe> => {
  const { data } = await authHttp.get("/auth/me");
  return data;
};

// If backend sends token on callback (e.g., query ?token=...)
// optionally exchange code → token if needed:
export const exchangeCode = async (code: string) => {
  const { data } = await authHttp.post("/auth/exchange", { code });
  return data as { token: string };
};
