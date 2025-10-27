import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v1";

export const tasksApi = {
  getAll: async (token: string) => {
    const res = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  create: async (token: string, task: { title: string; description?: string }) => {
    const res = await axios.post(`${API_URL}/tasks`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  delete: async (token: string, id: number) => {
    const res = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  update: async (token: string, id: number, task: { title: string; description?: string; isCompleted?: boolean }) => {
    const res = await axios.put(`${API_URL}/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    },

};
