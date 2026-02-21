const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  signup: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return res.json();
  },

  getTasks: async (token: string) => {
    const res = await fetch(`${API_URL}/api/tasks`, {
      headers: {
        Authorization: token,
      },
    });

    return res.json();
  },

  createTask: async (data: any, token: string) => {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};