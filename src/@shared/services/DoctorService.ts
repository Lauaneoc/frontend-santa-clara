import axios from "axios";
import { Doctor } from "../interfaces/models/Doctor";

const DoctorService = {
  getDoctors: async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctor");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  },
  createOne: async (doctor: Partial<Doctor>) => {
    const response = await axios.post<Doctor>(
      `http://localhost:3000/doctor`,
      doctor
    );
    return response.data;
  },
  updateOne: async (doctor: Doctor) => {
    const response = await axios.put<Doctor>(
      `http://localhost:3000/doctor/${doctor.id}`,
      doctor
    );
    return response.data;
  },
  deleteOne: async (doctorId: string) => {
    await axios.delete(`http://localhost:3000/doctor/${doctorId}`);
  },
};

export default DoctorService;
