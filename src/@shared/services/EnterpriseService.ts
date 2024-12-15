import axios from "axios";
import { Enterprise } from "../interfaces/models/Enterprise";

const EnterpriseService = {
  getEnterprises: async () => {
    try {
      const response = await axios.get("http://10.0.0.129:8080/enterprise");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching enterprises:", error);
      throw error;
    }
  },
  createOne: async (enterprise: Partial<Enterprise>) => {
    const response = await axios.post<Enterprise>(
      `http://localhost:3000/enterprise`,
      enterprise
    );
    return response.data;
  },
  updateOne: async (enterprise: Enterprise) => {
    const response = await axios.put<Enterprise>(
      `http://localhost:3000/enterprise/${enterprise.id}`,
      enterprise
    );
    return response.data;
  },
  deleteOne: async (enterpriseId: string) => {
    await axios.delete(`http://localhost:3000/enterprise/${enterpriseId}`);
  },
};

export default EnterpriseService;
