import axios from "axios";

export const createUserSlice = (set) => ({
  user: null,
  login: async (userData) => {
    try {
      set({ loading: true });
      const { data } = await axios.post("/api/v1/auth/login", userData);
      set({ loading: false, user: data });
    } catch (error) {
      set({ loading: false });
      throw error.response.data.error;
    }
  },
  setloaderUser: async (user) => {
    set({ user });
  },
});
