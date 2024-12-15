import axios from "axios";
import { Enterprise } from "../interfaces/models/Enterprise";

const SchedulingService = {
  getSchedulings: async () => {
    try {
      const response = await axios.get("http://10.0.0.129:8080/scheduling");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Schedulings:", error);
      throw error;
    }
  },
  createOne: async (scheduling: Partial<Enterprise>) => {
    const response = await axios.post<Enterprise>(
      `http://localhost:3000/scheduling`,
      scheduling
    );
    return response.data;
  },
  updateOne: async (scheduling: Enterprise) => {
    const response = await axios.put<Enterprise>(
      `http://localhost:3000/scheduling/${scheduling.id}`,
      scheduling
    );
    return response.data;
  },
  deleteOne: async (schedulingId: string) => {
    await axios.delete(`http://localhost:3000/scheduling/${schedulingId}`);
  },
};

export default SchedulingService;
