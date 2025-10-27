import { http } from "./https";

export const authApi = {
  async login(email: string, password: string) {
    const { data } = await http.post("/auth/login", { email, password });
    return data;
  },
  async register(username: string, email: string, password: string) {
    const { data } = await http.post("/auth/register", { username, email, password });
    return data;
  },
};
