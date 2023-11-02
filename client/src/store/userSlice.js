import axios from "axios";

export const createUserSlice = (set) => ({
  user: null,
  login: async (userData) => {
    try {
      set({ loading: true })
      const { data } = await axios.post("/api/v1/auth/login", userData);
      set({ loading: false, user: data });
    } catch (error) {
      set({ loading: false});
      throw error.response.data.error;
    }
  },
  setloaderUser: async (user) => {
    set({user});
  },
  logout: async () => {
    try {
      set({ loading: true })
      await axios.get("/api/v1/auth/logout");
      set({ loading: false, user: null });
    } catch (error) {
      set({ loading: false});
      throw error.response.data.error;
    }
  }
  
});
