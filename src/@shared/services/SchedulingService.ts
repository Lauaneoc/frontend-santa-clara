import axios from "axios";
import {
  Scheduling,
  SchedulingCreate,
  SchedulingUpdate,
} from "../interfaces/models/Scheduling";

const SchedulingService = {
  getSchedulings: async () => {
    try {
      const response = await axios.get("http://localhost:3000/scheduling");
      return response.data;
    } catch (error) {
      console.error("Error fetching Schedulings:", error);
      throw error;
    }
  },
  countExamsByStatus: async () => {
    const response = await axios.get("http://localhost:3000/scheduling/countExamsByStatus");
    return response.data;
  },
  getTopEnterprises: async () => {
    const response = await axios.get("http://localhost:3000/scheduling/getTopEnterprisesByScheduling");
    return response.data;
  },
  getTop20Exams: async () => {
    const response = await axios.get("http://localhost:3000/scheduling/getTop20Exams");
    return response.data;
  },
  createOne: async (scheduling: Partial<SchedulingCreate>) => {
    const response = await axios.post<SchedulingCreate>(
      `http://localhost:3000/scheduling`,
      scheduling
    );
    return response.data;
  },
  updateOne: async (scheduling: SchedulingUpdate) => {
    const response = await axios.put<Scheduling>(
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
