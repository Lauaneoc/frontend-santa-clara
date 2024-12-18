import axios from "axios";
import { User } from "../interfaces/models/User";

const UserService = {
  getUsers: async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  createOne: async (user: Partial<User>) => {
    const response = await axios.post<User>(
      `http://localhost:3000/auth/register`,
      user
    );
    return response.data;
  },
  updateOne: async (user: User) => {
    const response = await axios.put<User>(
      `http://localhost:3000/scheduling/${user.nome}`,
      user
    );
    return response.data;
  },
  deleteOne: async (schedulingId: string) => {
    await axios.delete(`http://localhost:3000/auth/register/${schedulingId}`);
  },

  login: async (credentials: { email: string; senha: string }) => {
    try {
      const response = await axios.post(`http://localhost:3000/auth/login`, credentials);
      console.log("User logged in:", response.data);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  isAuthenticated: () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return user && token;
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

export default UserService;
